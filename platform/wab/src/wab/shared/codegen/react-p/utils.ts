import {
  Component,
  ImageAsset,
  Site,
  TplNode,
  Variant,
  VariantGroup,
} from "@/wab/classes";
import { ensure, maybe } from "@/wab/common";
import {
  getCodeComponentImportName,
  getSuperComponents,
  isCodeComponent,
  isPageComponent,
} from "@/wab/components";
import { DEVFLAGS } from "@/wab/devflags";
import { ExprCtx } from "@/wab/exprs";
import { ImageAssetType } from "@/wab/image-asset-type";
import { CodeComponentWithHelpers } from "@/wab/shared/code-components/code-components";
import {
  ExportOpts,
  ExportPlatform,
  ProjectConfig,
  TargetEnv,
} from "@/wab/shared/codegen/types";
import {
  jsLiteral,
  stripExtension,
  toClassName,
  toJsIdentifier,
  toVarName,
} from "@/wab/shared/codegen/util";
import {
  makeGlobalVariantGroupContextName,
  makeGlobalVariantGroupFileName,
} from "@/wab/shared/codegen/variants";
import { VariantGroupType } from "@/wab/shared/Variants";
import { allImportedStyleTokensWithProjectInfo } from "@/wab/sites";
import { ASPECT_RATIO_SCALE_FACTOR } from "@/wab/tpls";
import L, { last, lowerFirst } from "lodash";

export const projectStyleCssImportName = "projectcss";
export const defaultStyleCssImportName = "defaultcss";
export const defaultStyleCssFileName = "plasmic__default_style.css";

interface ClassNameOpts {
  targetEnv: TargetEnv;
}

export function makeWabInstanceClassName(opts: ClassNameOpts) {
  return opts.targetEnv === "loader"
    ? `${shortPlasmicPrefix}i`
    : "__wab_instance";
}
export function makeWabFlexContainerClassName(opts: ClassNameOpts) {
  return opts.targetEnv === "loader"
    ? `${shortPlasmicPrefix}fc`
    : "__wab_flex-container";
}
export function makeWabSlotClassName(opts: ClassNameOpts) {
  return opts.targetEnv === "loader" ? `${shortPlasmicPrefix}s` : "__wab_slot";
}
export function makeWabSlotStringWrapperClassName(opts: ClassNameOpts) {
  return opts.targetEnv === "loader"
    ? `${shortPlasmicPrefix}sw`
    : "__wab_slot-string-wrapper";
}

export function makeWabTextClassName(opts: ClassNameOpts) {
  return opts.targetEnv === "loader" ? `${shortPlasmicPrefix}t` : "__wab_text";
}

export function makeWabHtmlTextClassName(opts: ClassNameOpts) {
  return opts.targetEnv === "loader"
    ? `${shortPlasmicPrefix}th`
    : "__wab_expr_html_text";
}

export function makeDefaultStyleClassNameBase(opts: ClassNameOpts) {
  return opts.targetEnv === "loader"
    ? `${shortPlasmicPrefix}d`
    : "plasmic_default";
}

export function makeDefaultStyleCompWrapperClassName(opts: ClassNameOpts) {
  return `${makeDefaultStyleClassNameBase(opts)}${
    opts.targetEnv === "loader" ? "c" : "__component_wrapper"
  }`;
}

export function makeDefaultInlineClassName(opts: ClassNameOpts) {
  return `${makeDefaultStyleClassNameBase(opts)}${
    opts.targetEnv === "loader" ? "n" : "__inline"
  }`;
}

export function makeRootResetClassName(
  projectId: string,
  opts: ClassNameOpts & { useCssModules: boolean }
) {
  if (opts.targetEnv === "loader") {
    return `${shortPlasmicPrefix}r-${projectId.slice(0, 5)}`;
  } else if (opts.useCssModules) {
    return `root_reset`;
  } else {
    return `root_reset_${projectId}`;
  }
}

export function makePlasmicDefaultStylesClassName(opts: ClassNameOpts) {
  return opts.targetEnv === "loader"
    ? `${shortPlasmicPrefix}dss`
    : "plasmic_default_styles";
}

export function makePlasmicTokensClassName(opts: ClassNameOpts) {
  return opts.targetEnv === "loader"
    ? `${shortPlasmicPrefix}tns`
    : "plasmic_tokens";
}

export function makePlasmicMixinsClassName(opts: ClassNameOpts) {
  return opts.targetEnv === "loader"
    ? `${shortPlasmicPrefix}mns`
    : "plasmic_mixins";
}

export const shortPlasmicPrefix = "ρ";

export type VariantChecker = (variant: Variant) => string;

export const safeShortUuid = (shortUuid: string) => {
  // The shortId we use in https://github.com/dylang/shortid may contain "-",
  // which is not safe for JS identifier.
  return shortUuid.replace(/-/g, "$");
};

export type NodeNamer = (node: TplNode) => string | undefined;

export function makeStylesImports(
  site: Site,
  component: Component,
  projectConfig: ProjectConfig,
  opts: ExportOpts,
  scheme: "blackbox" | "plain" = "blackbox"
) {
  const useCssModules = opts.stylesOpts.scheme === "css-modules";
  const cssImport = (name: string, path: string) => {
    // Gatsby >= 3 expects CSS modules to be imported using star (i.e.,
    // "import * as name from ...") while CRA >= 5 / Next.js does not support that
    // (requiring "import name from ...").
    const importName = !useCssModules
      ? ""
      : opts.platform === "gatsby"
      ? `* as ${name} from`
      : `${name} from`;
    const importPath = `${stripExtension(path, true)}${
      useCssModules ? ".module.css" : ".css"
    }`;
    return `import ${importName} "./${importPath}"`;
  };

  const cssProjectDependencies = L.uniqBy(
    allImportedStyleTokensWithProjectInfo(site),
    "projectId"
  );

  return `
    ${
      opts.stylesOpts.skipGlobalCssImport
        ? ""
        : `import "@plasmicapp/react-web/lib/plasmic.css";`
    }
    ${
      // Only import defaultcss if we're not using CSS modules. If we are
      // using CSS modules, defaultcss will be in projectcss.
      useCssModules
        ? ""
        : `${cssImport(
            defaultStyleCssImportName,
            defaultStyleCssFileName
          )}; // plasmic-import: global/${defaultStyleCssImportName}`
    }
    ${
      DEVFLAGS.variantedStyles && !opts.includeImportedTokens
        ? cssProjectDependencies
            .map(
              (dep) =>
                `${cssImport(
                  `${makeCssProjectImportName(dep.projectName)}`,
                  opts.idFileNames
                    ? makeCssProjectIdFileName(dep.projectId)
                    : makeCssProjectFileName(dep.projectName)
                )} // plasmic-import: ${
                  dep.projectId
                }/${projectStyleCssImportName}`
            )
            .join("\n")
        : ""
    }
    ${cssImport(
      projectStyleCssImportName,
      projectConfig.cssFileName
    )}; // plasmic-import: ${
    projectConfig.projectId
  }/${projectStyleCssImportName}
    ${cssImport(
      "sty",
      opts.idFileNames
        ? makeComponentCssIdFileName(component)
        : scheme === "blackbox"
        ? makePlasmicComponentName(component)
        : getExportedComponentName(component)
    )} // plasmic-import: ${component.uuid}/css
  `;
}

export function makeUseClient(opts: Partial<ExportOpts>): string {
  if (opts?.platform === "nextjs" && opts.platformOptions?.nextjs?.appDir) {
    // Only add "use client" for Next.js app/ dir projects.
    // For other projects, the presence of this directive may cause unwanted warnings from bundlers.
    // In the future when server components are more widespread, we can remove the conditional.
    return `"use client";`;
  } else {
    return "";
  }
}

export function makePlatformImports(opts: ExportOpts): string {
  if (opts.platform === "gatsby") {
    return `
      import { Link, GatsbyLinkProps as LinkProps, navigate as __gatsbyNavigate } from "gatsby";
    `;
  } else if (opts.platform === "nextjs") {
    // Next.js has multiple routing hooks depending on your Next.js version and pages/ or app/ dir:
    // * next/router - all recent Next.js versions, but only works for pages/
    // * next/navigation - Next.js 13+, works for both pages/ and app/
    //
    // The APIs are similar (but not the exact same!), so we switch it here at the import.
    // When generating code that uses this hook, make sure that it works for both.
    // https://beta.nextjs.org/docs/upgrade-guide#step-5-migrating-routing-hooks
    if (opts.platformOptions?.nextjs?.appDir) {
      return `
      import Head from "next/head";
      import Link, { LinkProps } from "next/link";
      import { useRouter } from "next/navigation";
    `;
    } else {
      return `
      import Head from "next/head";
      import Link, { LinkProps } from "next/link";
      import { useRouter } from "next/router";
    `;
    }
  } else {
    return "";
  }
}

export function getPlatformImportComponents(platform: ExportPlatform) {
  const names: string[] = [];
  if (platform === "nextjs") {
    names.push("Link", "LinkProps", "Head");
  }
  if (platform === "gatsby") {
    names.push("Link", "LinkProps");
  }
  return names;
}

export function getExportedComponentName(component: Component) {
  if (isCodeComponent(component)) {
    return getSingleExportedComponentName(component);
  }
  return [...getSuperComponents(component), component]
    .map(getSingleExportedComponentName)
    .join("__");
}

function getSingleExportedComponentName(component: Component) {
  if (isCodeComponent(component)) {
    return getCodeComponentImportName(component);
  }
  return getNormalizedComponentName(component);
}

export function getNormalizedComponentName(component: Component) {
  if (isCodeComponent(component)) {
    return component.name;
  }
  if (component.name) {
    const className = toClassName(component.name);
    if (className) {
      return className;
    }
  }
  return toClassName(`Component${component.uuid}`);
}

export function isPageAwarePlatform(platform: string) {
  return platform === "nextjs" || platform === "gatsby";
}

export function getSkeletonModuleFileName(
  component: Component,
  opts: ExportOpts
): string {
  if (opts.idFileNames) {
    return `${makeComponentSkeletonIdFileName(component)}.tsx`;
  }
  if (isPageComponent(component) && isPageAwarePlatform(opts.platform)) {
    const path = component.pageMeta?.path;
    if (path) {
      if (path === "/" || path.endsWith("/index")) {
        return `${L.trim(path, "/")}/index.tsx`;
      } else {
        return `${L.trim(path, "/")}.tsx`;
      }
    }
  }

  return `${getExportedComponentName(component)}.tsx`;
}

export function makeGlobalContextPropName(
  comp: Component,
  aliases?: Map<Component, string>
) {
  let componentName: string;
  if (aliases?.get(comp)) {
    componentName = aliases.get(comp)!;
  } else {
    componentName =
      comp.codeComponentMeta?.importName ??
      toJsIdentifier(comp.name, { capitalizeFirst: true });
    if (comp.codeComponentMeta?.defaultExport) {
      componentName = toClassName(componentName);
    }
  }
  return `${lowerFirst(componentName)}Props`;
}

export function makeGlobalContextsImport(projectConfig: ProjectConfig) {
  return `import GlobalContextsProvider from "./PlasmicGlobalContextsProvider"; // plasmic-import: ${projectConfig.globalContextBundle?.id}/globalContext`;
}

export function wrapGlobalContexts(content: string) {
  return `<GlobalContextsProvider>
  ${content}
  </GlobalContextsProvider>`;
}

export function makeGlobalGroupImports(
  globalGroups: VariantGroup[],
  opts: { idFileNames?: boolean } = {}
) {
  return globalGroups
    .map((vg) => {
      const groupFileName = opts.idFileNames
        ? makeGlobalVariantIdFileName(vg)
        : makeGlobalVariantGroupFileName(vg);
      if (vg.type === VariantGroupType.GlobalScreen) {
        return `import {ScreenVariantProvider} from "./${stripExtension(
          groupFileName
        )}"; // plasmic-import: ${vg.uuid}/globalVariant`;
      } else {
        return `import {${makeGlobalVariantGroupContextName(
          vg
        )}} from "./${stripExtension(groupFileName)}"; // plasmic-import: ${
          vg.uuid
        }/globalVariant`;
      }
    })
    .join("\n");
}

export function wrapGlobalProvider(
  vg: VariantGroup,
  content: string,
  curlyBrackets: boolean,
  activeVariants: Variant[]
): string {
  if (vg.type === VariantGroupType.GlobalScreen) {
    // We don't need to wrap ScreenVariantProvider anymore
    return content;
  } else {
    const contextName = makeGlobalVariantGroupContextName(vg);
    const value =
      activeVariants.length === 0
        ? "undefined"
        : vg.multi
        ? jsLiteral(activeVariants.map((v) => toVarName(v.name)))
        : jsLiteral(toVarName(activeVariants[0].name));
    return `
      <${contextName}.Provider value={${value}}>
        ${curlyBrackets ? "{" : ""}
        ${content}
        ${curlyBrackets ? "}" : ""}
      </${contextName}.Provider>
    `;
  }
}

export function wrapGlobalProviderWithCustomValue(
  vg: VariantGroup,
  content: string,
  curlyBrackets: boolean,
  value: string
): string {
  if (vg.type === VariantGroupType.GlobalScreen) {
    // We don't need to wrap ScreenVariantProvider anymore
    return content;
  } else {
    const contextName = makeGlobalVariantGroupContextName(vg);
    return `
      <${contextName}.Provider value={${value}}>
        ${curlyBrackets ? "{" : ""}
        ${content}
        ${curlyBrackets ? "}" : ""}
      </${contextName}.Provider>
    `;
  }
}

export function makeVariantsArgTypeName(component: Component) {
  return `Plasmic${getExportedComponentName(component)}__VariantsArgs`;
}

export function makeVariantMembersTypeName(component: Component) {
  return `Plasmic${getExportedComponentName(component)}__VariantMembers`;
}

export function makePlasmicComponentName(component: Component) {
  return `Plasmic${getExportedComponentName(component)}`;
}

export function makeDefaultExternalPropsName(component: Component) {
  return `Default${getExportedComponentName(component)}Props`;
}

export function makePlasmicIsPreviewRootComponent() {
  return `__plasmicIsPreviewRoot`;
}

export function makeArgsTypeName(component: Component) {
  return `Plasmic${getExportedComponentName(component)}__ArgsType`;
}

export function makeOverridesTypeName(component: Component) {
  return `Plasmic${getExportedComponentName(component)}__OverridesType`;
}

export function makeGlobalVariantsTypeName(component: Component) {
  return `Plasmic${getExportedComponentName(component)}__GlobalVariantsType`;
}

export function makeVariantPropsName(component: Component) {
  return `Plasmic${getExportedComponentName(component)}__VariantProps`;
}

export function makeArgPropsName(component: Component) {
  return `Plasmic${getExportedComponentName(component)}__ArgProps`;
}

export function makeTriggerStateTypeName(component: Component) {
  return `Plasmic${getExportedComponentName(component)}__TriggerStateType`;
}

// Node components are in pascal case to avoid eslint warnings. See
// https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-pascal-case.md
export function makeNodeComponentName(component: Component, nodeName: string) {
  return `Plasmic${getExportedComponentName(component)}${L.upperFirst(
    nodeName
  )}`;
}

export function getImportedComponentName(
  aliases: Map<Component | ImageAsset, string>,
  component: Component
) {
  if (aliases.has(component)) {
    return ensure(
      aliases.get(component),
      "Aliases are expected to contain component (that was checked one line above)"
    );
  }
  if (isCodeComponent(component)) {
    return getCodeComponentImportName(component);
  }
  return getExportedComponentName(component);
}

export function getImportedCodeComponentHelperName(
  aliases: Map<Component | ImageAsset, string>,
  c: CodeComponentWithHelpers
) {
  return `${getImportedComponentName(aliases, c)}_Helpers`;
}

export function makeRenderFuncName(component: Component) {
  return `Plasmic${getExportedComponentName(component)}__RenderFunc`;
}

export function makeImportedPictureRef(asset: ImageAsset) {
  return `${toVarName(`${asset.name}-${asset.uuid}`)}`;
}

export function makePictureRefToken(asset: ImageAsset) {
  return `Plasmic_Image_${asset.uuid}__Ref`;
}

export function makeDescendantsName() {
  return `PlasmicDescendants`;
}

export function makePlasmicSuperContextName(component: Component) {
  return `${makePlasmicComponentName(component)}Context`;
}

export function makeComponentSkeletonIdFileName(component: Component) {
  return `comp__${component.uuid}`;
}

export function makeCodeComponentHelperSkeletonIdFileName(
  component: Component
) {
  return `compHelper__${component.uuid}`;
}

export function makeComponentRenderIdFileName(component: Component) {
  return `render__${component.uuid}`;
}

export function makeComponentCssIdFileName(component: Component) {
  return `css__${component.uuid}`;
}

export function makeAssetIdFileName(asset: ImageAsset) {
  return `${asset.type}__${asset.uuid}`;
}

export function makeGlobalVariantIdFileName(group: VariantGroup) {
  return `global__${group.uuid}`;
}

export function makeCssProjectImportName(projectName: string) {
  return `plasmic_${L.snakeCase(projectName)}_css`;
}

export function makeCssProjectFileName(projectName: string) {
  return `plasmic_${L.snakeCase(projectName)}`;
}

export function makeCssProjectIdFileName(projectId: string) {
  return `project_${projectId}`;
}

export function makeCssFileName(
  baseName: string,
  exportOpts?: Partial<ExportOpts>
) {
  const useCssModules = exportOpts?.stylesOpts?.scheme === "css-modules";
  return `${baseName}${useCssModules ? ".module.css" : ".css"}`;
}

export function maybeMakePlasmicImgSrc(asset: ImageAsset, exprCtx: ExprCtx) {
  if (!asset.dataUri) {
    return undefined;
  }

  // Don't use PlasmicImg if...
  if (
    // Not a Picture
    asset.type !== ImageAssetType.Picture ||
    // Not enabled for project
    !exprCtx.projectFlags.usePlasmicImg ||
    // No imgOptimizerHost set
    !DEVFLAGS.imgOptimizerHost ||
    // No known full width/height
    !asset.width ||
    !asset.height
  ) {
    return asset.dataUri;
  }

  const imgId =
    asset.dataUri.startsWith("http") &&
    ensure(
      last(asset.dataUri.split("/")),
      "A URL starting with 'http' should contain slashes"
    );

  return {
    src:
      !imgId || imgId.endsWith(".svg")
        ? asset.dataUri
        : `${DEVFLAGS.imgOptimizerHost}/img-optimizer/v1/img/${imgId}`,
    fullWidth: asset.width,
    fullHeight: asset.height,
    aspectRatio: maybe(
      asset.aspectRatio,
      (aspectRatio) => aspectRatio / ASPECT_RATIO_SCALE_FACTOR
    ),
  };
}
