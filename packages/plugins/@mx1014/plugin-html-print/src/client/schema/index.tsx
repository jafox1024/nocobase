/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { ISchema, useRequest } from '@nocobase/client';
import { tStr } from '../locale';
import { ActionName } from '../constants';
import { printActionModalSettings } from '../settings';

import { css } from '@emotion/css';
import { useFieldSchema } from '@formily/react';
import React, { useMemo, FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useFormBlockContext, useRecord, Variable, useVariableOptions, useDesignable } from '@nocobase/client';

// export const printTemplate: FC = () => {
//   const fieldSchema = useFieldSchema();

//   const componentProps = fieldSchema['x-component-props'] || {};
//   const initialValues = {
//     template: componentProps.template,
//   };
//   console.log("initialValues:");
//   console.log(initialValues);
//   return <>
//   </>
// }
export const createPrintActionModalSchema = (blockComponent: string): ISchema => {
  return {
    type: 'void',
    'x-component': 'Action',
    'x-settings': printActionModalSettings.name,
    title: tStr(ActionName),
    'x-component-props': {
      type: 'primary',
    },
    properties: {
      drawer: {
        type: 'void',
        'x-component': 'Action.Drawer',
        'x-component-props': {
          size: 'large',
        },
        properties: {
          iframe: {
            type: 'void',
            'x-component': 'iframe',
            'x-component-props': {
              src: `https://client.docs.nocobase.com/components/${blockComponent}`,
              style: {
                border: 'none',
                width: '100%',
                height: '100%',
              },
            },
          },
        },
      },
    },
  };
};

export const getVariableComponentWithScope = (Com) => {
  return (props) => {
    const fieldSchema = useFieldSchema();
    const { form } = useFormBlockContext();
    const record = useRecord();
    const scope = useVariableOptions({
      collectionField: { uiSchema: fieldSchema },
      form,
      record,
      uiSchema: fieldSchema,
      noDisabled: true,
    });
    return <Com {...props} scope={scope} />;
  };
};

const Component = () => {
  const { data } = useRequest<{
    data: any[];
  }>(
    {
      url: 'htmlPrintSettings:list',
      method: 'get',
    },
    {
      uid: 'test',
    },
  );

  const templates = useMemo(() => {
    return (
      data?.data?.map((item: any) => ({
        label: item.title,
        value: item.id,
      })) || []
    ); // 空值保护
  }, [data]);
  return templates;
};

export const usePrintAndHTMLSchema = () => {
  const { t } = useTranslation();
  // const Com = useMemo(() => getVariableComponentWithScope(Variable.TextArea), []);

  const { data } = useRequest<{
    data: any[];
  }>(
    {
      url: 'htmlPrintSettings:list',
      method: 'get',
    },
    {
      uid: 'test',
    },
  );

  const templates = useMemo(() => {
    return (
      data?.data?.map((item: any) => ({
        label: item.title,
        value: item.id,
      })) || []
    ); // 空值保护
  }, [data]);
  console.log('data:');
  console.log(data);

  const urlSchema = useMemo(() => {
    return {
      title: t('print Template'),
      type: 'string',
      enum: templates,
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-component-props': {
        placeholder: t('Please select'),
        objectValue: true,
      },

      description: t('选择对应的打印模板'),
    };
  }, [t, templates]);

  // const htmlSchema = useMemo(() => {
  //   return {
  //     title: t('print Template'),
  //     type: 'string',
  //     'x-decorator': 'FormItem',
  //     'x-component': getVariableComponentWithScope(Variable.RawTextArea),
  //     'x-component-props': {
  //       rows: 10,
  //     },
  //   };
  // }, [t]);

  return { urlSchema };
};
