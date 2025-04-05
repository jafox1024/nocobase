/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { defineCollection } from '@nocobase/database';

export default defineCollection({
  name: 'htmlPrintSettings',
  fields: [
    {
      type: 'string',
      name: 'title',
    },
    {
      type: 'markdown',
      name: 'head',
    },
    {
      type: 'markdown',
      name: 'body',
    },
    {
      type: 'markdown',
      name: 'tail',
    },
    {
      type: 'string',
      name: 'pageSize',
    },

    {
      key: 'cbkrcpobknq',
      name: 'id',
      type: 'bigInt',
      interface: 'integer',
      description: null,
      collectionName: 'aa',
      parentKey: null,
      reverseKey: null,
      uiSchema: {
        type: 'number',
        title: '{{t("ID")}}',
        'x-component': 'InputNumber',
        'x-read-pretty': true,
      },
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    {
      key: 'xnpk8j33ulw',
      name: 'createdAt',
      type: 'date',
      interface: 'createdAt',
      description: null,
      collectionName: 'aa',
      parentKey: null,
      reverseKey: null,
      field: 'createdAt',
      uiSchema: {
        type: 'datetime',
        title: '{{t("Created at")}}',
        'x-component': 'DatePicker',
        'x-read-pretty': true,
        'x-component-props': {},
      },
    },
    {
      key: 'tond37ffjc9',
      name: 'createdBy',
      type: 'belongsTo',
      interface: 'createdBy',
      description: null,
      collectionName: 'aa',
      parentKey: null,
      reverseKey: null,
      target: 'users',
      uiSchema: {
        type: 'object',
        title: '{{t("Created by")}}',
        'x-component': 'AssociationField',
        'x-read-pretty': true,
        'x-component-props': {
          fieldNames: {
            label: 'nickname',
            value: 'id',
          },
        },
      },
      targetKey: 'id',
      foreignKey: 'createdById',
    },
    {
      key: '8mbaba8dhs4',
      name: 'updatedAt',
      type: 'date',
      interface: 'updatedAt',
      description: null,
      collectionName: 'aa',
      parentKey: null,
      reverseKey: null,
      field: 'updatedAt',
      uiSchema: {
        type: 'string',
        title: '{{t("Last updated at")}}',
        'x-component': 'DatePicker',
        'x-read-pretty': true,
        'x-component-props': {},
      },
    },
    {
      key: '06hqse9mkpg',
      name: 'updatedBy',
      type: 'belongsTo',
      interface: 'updatedBy',
      description: null,
      collectionName: 'aa',
      parentKey: null,
      reverseKey: null,
      target: 'users',
      uiSchema: {
        type: 'object',
        title: '{{t("Last updated by")}}',
        'x-component': 'AssociationField',
        'x-read-pretty': true,
        'x-component-props': {
          fieldNames: {
            label: 'nickname',
            value: 'id',
          },
        },
      },
      targetKey: 'id',
      foreignKey: 'updatedById',
    },
  ],
});
