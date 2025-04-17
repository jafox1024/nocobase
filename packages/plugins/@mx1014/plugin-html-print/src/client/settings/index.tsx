/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import {
  SchemaSettingsModalItem,
  ButtonEditor,
  SchemaSettings,
  useDesignable,
  useSchemaToolbar,
} from '@nocobase/client';
import { ActionNameLowercase } from '../constants';
import { useField, useFieldSchema } from '@formily/react';
import { useTranslation } from 'react-i18next';
import { ArrayItems } from '@formily/antd-v5';
import React, { FC } from 'react';
import { usePrintAndHTMLSchema } from '../schema/index';

export const SchemaSettingsActionLinkItem: FC = () => {
  const field = useField();
  const fieldSchema = useFieldSchema();
  const { dn } = useDesignable();
  const { t } = useTranslation();
  const { urlSchema } = usePrintAndHTMLSchema();
  const componentProps = fieldSchema['x-component-props'] || {};
  const initialValues = {
    template: componentProps.template,
  };

  return (
    <SchemaSettingsModalItem
      title={t('Edit Template')}
      components={{ ArrayItems }}
      schema={{
        type: 'object',
        title: t('Edit Template'),
        properties: {
          template: {
            ...urlSchema,
            required: true,
          },
        },
      }}
      onSubmit={({ template }) => {
        componentProps.template = template;
        fieldSchema['x-component-props'] = componentProps;
        field.componentProps.template = template;
        dn.emit('patch', {
          schema: {
            ['x-uid']: fieldSchema['x-uid'],
            'x-component-props': componentProps,
          },
        });
        dn.refresh();
      }}
      initialValues={initialValues}
    />
  );
};

export const printActionModalSettings = new SchemaSettings({
  name: `actionSettings:${ActionNameLowercase}`,
  items: [
    {
      name: 'editButton',
      Component: ButtonEditor,
      useComponentProps() {
        const { buttonEditorProps } = useSchemaToolbar();
        return buttonEditorProps;
      },
    },
    {
      name: 'editPrintTemplate',
      Component: SchemaSettingsActionLinkItem,
    },
    {
      name: 'remove',
      type: 'remove',
    },
  ],
});
