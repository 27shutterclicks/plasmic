import { Tooltip } from "antd";
import { observer } from "mobx-react-lite";
import * as React from "react";
import { Variant, VariantGroup } from "../../../classes";
import { ensureArray } from "../../../common";
import { toVarName } from "../../../shared/codegen/util";
import { serializeVariantGroupMembersType } from "../../../shared/codegen/variants";
import { isStandaloneVariantGroup } from "../../../shared/Variants";
import { PlasmicVariantProp } from "../../plasmic/plasmic_kit_docs_portal/PlasmicVariantProp";
import Select from "../widgets/Select";
import { XMultiSelect } from "../XMultiSelect";
import { DocsPortalCtx } from "./DocsPortalCtx";

interface VariantPropProps {
  docsCtx: DocsPortalCtx;
  group: VariantGroup;
}

const VariantProp = observer(function VariantProp(props: VariantPropProps) {
  const { docsCtx, group } = props;
  const param = group.param;
  const component = docsCtx.getFocusedComponent();
  const name = toVarName(param.variable.name);
  const value = ensureArray(
    docsCtx.getComponentToggle(component, param)
  ) as Variant[];
  const tsType = typeString(group);
  const isToggle = isStandaloneVariantGroup(group);
  return (
    <PlasmicVariantProp
      label={name}
      type={
        <Tooltip title={<code>{tsType}</code>}>
          <span>{tsType}</span>
        </Tooltip>
      }
      isToggle={isToggle}
      toggle={
        isToggle
          ? {
              isChecked: value.length > 0,
              onChange: (checked) => {
                if (checked) {
                  docsCtx.setComponentToggle(
                    component,
                    param,
                    group.variants[0]
                  );
                } else {
                  docsCtx.setComponentToggle(component, param, undefined);
                }
              },
              "aria-label": name,
            }
          : undefined
      }
    >
      {isStandaloneVariantGroup(group) ? null : group.multi ? (
        <XMultiSelect
          className="flex-fill dropdown-container--bordered"
          options={group.variants.filter((v) => !value.includes(v))}
          itemKey={(option) => (option ? option.uuid : "")}
          selectedItems={value}
          onSelect={(item) => {
            docsCtx.setComponentToggle(component, param, [...value, item]);
          }}
          onUnselect={(item) => {
            docsCtx.setComponentToggle(
              component,
              param,
              value.filter((v) => v !== item)
            );
          }}
          filterOptions={(options, input) => {
            if (!input) {
              return options;
            }
            return options.filter((op) =>
              op.name.toLowerCase().includes(input.toLowerCase())
            );
          }}
          renderOption={(option) => option.name}
          renderSelectedItem={(option) => option.name}
          renderInput={(options) => (
            <input {...options} className="transparent" />
          )}
          placeholder="(Unset)"
        />
      ) : (
        <Select
          value={value.length > 0 ? value[0].uuid : null}
          onChange={(key) => {
            if (key === "") {
              docsCtx.setComponentToggle(component, param, undefined);
            } else {
              const selected = group.variants.find((v) => v.uuid === key);
              docsCtx.setComponentToggle(component, param, selected);
            }
          }}
          placeholder="(Unset)"
          aria-label={name}
        >
          {[
            <Select.Option value={null} key="" textValue="Unset">
              <em>(Unset)</em>
            </Select.Option>,
            ...group.variants.map((variant) => (
              <Select.Option
                key={variant.uuid}
                value={variant.uuid}
                textValue={toVarName(variant.name)}
              >
                {toVarName(variant.name)}
              </Select.Option>
            )),
          ]}
        </Select>
      )}
    </PlasmicVariantProp>
  );
});

export function typeString(group: VariantGroup) {
  const membersType = serializeVariantGroupMembersType(group);
  if (isStandaloneVariantGroup(group)) {
    return `boolean | ${membersType}`;
  } else if (group.multi) {
    return `Array<${membersType}> | Record<${membersType}, boolean>`;
  } else {
    return membersType;
  }
}

export default VariantProp;
