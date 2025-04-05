/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import {
  ActionDesigner,
  SchemaSettings,
  SchemaSettingsItemType,
  SchemaSettingsLinkageRules,
  useCollection_deprecated,
  useSchemaToolbar,
} from '@nocobase/client';

// 定义 schemaSettingsItems 数组，包含多个子项及其对应的组件和属性
const schemaSettingsItems: SchemaSettingsItemType[] = [
  {
    name: 'Customize',
    Component: (props): any => {
      return props.children;
    },
    children: [
      {
        name: 'editButton',
        Component: ActionDesigner.ButtonEditor,
        useComponentProps() {
          const { buttonEditorProps } = useSchemaToolbar();
          return buttonEditorProps;
        },
      },
      {
        name: 'linkageRules',
        Component: SchemaSettingsLinkageRules,
        useComponentProps() {
          const { name } = useCollection_deprecated();
          const { linkageRulesProps } = useSchemaToolbar();
          return {
            ...linkageRulesProps,
            collectionName: name,
          };
        },
      },
      {
        name: 'remove',
        sort: 100,
        Component: ActionDesigner.RemoveButton as any,
        useComponentProps() {
          const { removeButtonProps } = useSchemaToolbar();
          return removeButtonProps;
        },
      },
    ],
  },
];

/**
 * @deprecated
 * 用于兼容之前的 name
 */
const deprecatedHTMLrintActionSettings = new SchemaSettings({
  name: 'ActionSettings:Hmtlprint',
  items: schemaSettingsItems,
});

// 创建 HTMLPrintActionSettings 实例，用于新名称
const HTMLPrintActionSettings = new SchemaSettings({
  name: 'actionSettings:Hmtlprint',
  items: schemaSettingsItems,
});

// 导出两个实例以供外部使用
export { deprecatedHTMLrintActionSettings, HTMLPrintActionSettings };
