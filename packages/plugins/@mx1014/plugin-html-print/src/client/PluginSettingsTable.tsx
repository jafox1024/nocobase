/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { uid } from '@formily/shared';
import React from 'react';
import { useMemo } from 'react';
import {
  ISchema,
  useActionContext,
  ActionProps,
  useCollection,
  useCollectionRecordData,
  useDataBlockRequest,
  useDataBlockResource,
  ExtendCollectionsProvider,
  SchemaComponent,
} from '@nocobase/client';
import { App as AntdApp } from 'antd';
import { useForm } from '@formily/react';
import { createForm } from '@formily/core';
import { usePluginSettingsTableRequest } from './PluginSettingsTableProvider';

const printTemplateCollection = {
  name: 'htmlPrintSettings',
  filterTargetKey: 'id',
  fields: [
    {
      type: 'string',
      name: 'id',
      interface: 'input',
      uiSchema: {
        title: 'id',
        required: true,
        'x-component': 'Input',
      },
    },
    {
      type: 'string',
      name: 'title',
      interface: 'input',
      uiSchema: {
        title: 'title',
        required: true,
        'x-component': 'Input',
      },
    },
    {
      type: 'markdown',
      name: 'head',
      interface: 'markdown',
      uiSchema: {
        title: 'head',
        required: false,
        'x-component': 'Markdown',
      },
    },
    {
      type: 'markdown',
      name: 'body',
      interface: 'markdown',
      uiSchema: {
        title: 'body',
        required: false,
        'x-component': 'Markdown',
      },
    },
    {
      type: 'markdown',
      name: 'tail',
      interface: 'markdown',
      uiSchema: {
        title: 'tail',
        required: false,
        'x-component': 'Markdown',
      },
    },
    {
      type: 'string',
      name: 'pageSize',
      interface: 'input',
      uiSchema: {
        title: 'pageSize',
        default: 'A4',
        required: true,
        'x-component': 'Input',
      },
    },
  ],
};

const useEditFormProps = () => {
  const recordData = useCollectionRecordData();
  console.log('recordData', recordData);
  const form = useMemo(
    () =>
      createForm({
        values: recordData,
      }),
    [],
  );

  return {
    form,
  };
};

const schema: ISchema = {
  type: 'void',
  name: uid(),
  'x-component': 'CardItem',
  'x-decorator': 'TableBlockProvider',
  'x-decorator-props': {
    collection: printTemplateCollection.name,
    action: 'list',
    showIndex: true,
    dragSort: false,
  },
  properties: {
    table: {
      type: 'array',
      'x-component': 'TableV2',
      'x-use-component-props': 'useTableBlockProps',
      'x-component-props': {
        rowKey: 'id',
        rowSelection: {
          type: 'checkbox',
        },
      },
      properties: {
        id: {
          type: 'void',
          title: 'id',
          'x-component': 'TableV2.Column',
          properties: {
            id: {
              type: 'string',
              'x-component': 'CollectionField',
              'x-pattern': 'readPretty',
            },
          },
        },
        title: {
          type: 'void',
          title: 'title',
          'x-component': 'TableV2.Column',
          properties: {
            title: {
              type: 'string',
              'x-component': 'CollectionField',
              'x-pattern': 'readPretty',
            },
          },
        },

        pageSize: {
          type: 'void',
          title: 'pageSize',
          'x-component': 'TableV2.Column',
          properties: {
            pageSize: {
              type: 'string',
              'x-component': 'CollectionField',
              'x-pattern': 'readPretty',
            },
          },
        },
        actions: {
          type: 'void',
          title: 'Actions',
          'x-component': 'TableV2.Column',
          properties: {
            actions: {
              type: 'void',
              'x-component': 'Space',
              'x-component-props': {
                split: '|',
              },
              properties: {
                edit: {
                  type: 'void',
                  title: 'Edit',
                  'x-component': 'Action.Link',
                  'x-component-props': {
                    openMode: 'drawer',
                    icon: 'EditOutlined',
                  },
                  properties: {
                    drawer: {
                      type: 'void',
                      title: 'Edit',
                      'x-component': 'Action.Drawer',
                      properties: {
                        form: {
                          type: 'void',
                          'x-component': 'FormV2',
                          'x-use-component-props': 'useEditFormProps',
                          properties: {
                            title: {
                              title: 'title',
                              'x-decorator': 'FormItem',
                              'x-component': 'CollectionField',
                            },
                            head: {
                              title: 'head',
                              'x-decorator': 'FormItem',
                              'x-component': 'CollectionField',
                            },
                            body: {
                              title: 'body',
                              'x-decorator': 'FormItem',
                              'x-component': 'CollectionField',
                            },
                            tail: {
                              title: 'tail',
                              'x-decorator': 'FormItem',
                              'x-component': 'CollectionField',
                            },
                            pageSize: {
                              title: 'pageSize',
                              'x-decorator': 'FormItem',
                              'x-component': 'CollectionField',
                            },
                            footer: {
                              type: 'void',
                              'x-component': 'Action',
                              title: 'Submit',
                              'x-use-component-props': 'useSubmitActionProps',
                            },
                          },
                        },
                      },
                    },
                  },
                },
                delete: {
                  type: 'void',
                  title: 'Delete',
                  'x-component': 'Action.Link',
                  'x-use-component-props': 'useDeleteActionProps',
                },
              },
            },
          },
        },
      },
    },
    actions: {
      type: 'void',
      'x-component': 'ActionBar',
      'x-component-props': {
        style: {
          marginBottom: 20,
        },
      },
      properties: {
        add: {
          type: 'void',
          'x-component': 'Action',
          title: 'Add New',
          'x-align': 'right',
          'x-component-props': {
            type: 'primary',
          },
          properties: {
            drawer: {
              type: 'void',
              'x-component': 'Action.Drawer',
              title: 'Add new',
              properties: {
                form: {
                  type: 'void',
                  'x-component': 'FormV2',
                  'x-use-component-props': 'useFormBlockProps',
                  properties: {
                    title: {
                      title: 'title',
                      'x-decorator': 'FormItem',
                      'x-component': 'CollectionField',
                    },
                    head: {
                      title: 'head',
                      'x-decorator': 'FormItem',
                      'x-component': 'CollectionField',
                    },
                    body: {
                      title: 'body',
                      'x-decorator': 'FormItem',
                      'x-component': 'CollectionField',
                    },
                    tail: {
                      title: 'tail',
                      'x-decorator': 'FormItem',
                      'x-component': 'CollectionField',
                    },
                    pageSize: {
                      title: 'pageSize',
                      'x-decorator': 'FormItem',
                      'x-component': 'CollectionField',
                    },
                    footer: {
                      type: 'void',
                      'x-component': 'Action',
                      title: 'Submit',
                      'x-use-component-props': 'useSubmitActionProps',
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

function useDeleteActionProps(): ActionProps {
  const { message } = AntdApp.useApp();
  const record = useCollectionRecordData();
  const resource = useDataBlockResource();
  const collection = useCollection();
  const { runAsync } = useDataBlockRequest();
  const globalSettingsTableRequest = usePluginSettingsTableRequest();
  return {
    confirm: {
      title: 'Delete',
      content: 'Are you sure you want to delete it?',
    },
    async onClick() {
      await resource.destroy({
        filterByTk: record[collection.filterTargetKey],
      });
      await runAsync();
      await globalSettingsTableRequest.runAsync();
      message.success('Deleted!');
    },
  };
}

const useSubmitActionProps = () => {
  const collection = useCollection();
  const { setVisible } = useActionContext();
  const { message } = AntdApp.useApp();
  const form = useForm();
  const resource = useDataBlockResource();
  const { runAsync } = useDataBlockRequest();
  const globalSettingsTableRequest = usePluginSettingsTableRequest();

  return {
    type: 'primary',
    async onClick() {
      await form.submit();
      const values = form.values;
      // await resource.create({ values })
      if (values[collection.filterTargetKey]) {
        await resource.update({
          values,
          filterByTk: values[collection.filterTargetKey],
        });
      } else {
        await resource.create({
          values,
        });
      }
      await runAsync();
      await globalSettingsTableRequest.runAsync();
      message.success('Saved successfully');
      setVisible(false);
    },
  };
};
export const PluginSettingsTable = () => {
  return (
    <ExtendCollectionsProvider collections={[printTemplateCollection]}>
      <SchemaComponent schema={schema} scope={{ useSubmitActionProps, useEditFormProps, useDeleteActionProps }} />
    </ExtendCollectionsProvider>
  );
};
