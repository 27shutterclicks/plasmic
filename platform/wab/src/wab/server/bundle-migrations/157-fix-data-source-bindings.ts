import {
  CustomCode,
  DataSourceTemplate,
  isKnownDataSourceOpExpr,
  isKnownTemplatedString,
} from "../../classes";
import { randUint16 } from "../../common";
import { Bundler } from "../../shared/bundler";
import {
  getDynamicStringSegments,
  isDynamicValue,
} from "../../shared/dynamic-bindings";
import { findExprsInComponent } from "../../tpls";
import { UnbundledMigrationFn } from "../db/BundleMigrator";
import {
  BundleMigrationType,
  unbundleSite,
} from "../db/bundle-migration-utils";

function mkBindingId() {
  return `{{${randUint16().toString()}}}`;
}

export const migrate: UnbundledMigrationFn = async (bundle, db, entity) => {
  const bundler = new Bundler();
  const { site, siteOrProjectDep } = await unbundleSite(
    bundler,
    bundle,
    db,
    entity
  );

  for (const component of site.components) {
    for (const { expr } of findExprsInComponent(component)) {
      if (!isKnownDataSourceOpExpr(expr)) {
        continue;
      }

      for (const template of Object.values(expr.templates)) {
        fixDataSourceTemplate(template);
      }
    }
  }

  const newBundle = bundler.bundle(
    siteOrProjectDep,
    entity.id,
    "157-fix-data-source-bindings"
  );
  Object.assign(bundle, newBundle);
};

function fixDataSourceTemplate(template: DataSourceTemplate) {
  if (isKnownTemplatedString(template.value)) {
    return;
  }
  const bindings = { ...template.bindings };
  let stringValue = template.value;
  getDynamicStringSegments(stringValue)
    .filter((seg) => isDynamicValue(seg) && !(seg in bindings))
    .forEach((dynamicValue) => {
      const binding = mkBindingId();
      const codeValue = dynamicValue.slice(2, -2);
      const code = new CustomCode({ code: codeValue, fallback: undefined });
      bindings[binding] = code;
      stringValue = stringValue.replace(dynamicValue, binding);
    });
  template.bindings = bindings;
  template.value = stringValue;
}

export const MIGRATION_TYPE: BundleMigrationType = "unbundled";
