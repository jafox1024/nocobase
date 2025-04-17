/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { Plugin } from '@nocobase/client';
import { createPrintActionModalInitializerItem } from './initializer';
import { PluginSettingsTable } from './PluginSettingsTable';
import { PluginSettingsTableProvider } from './PluginSettingsTableProvider';
import { printActionModalSettings } from './settings';

export class PluginHtmlPrintClient extends Plugin {
  async afterAdd() {}

  async beforeLoad() {}

  async load() {
    console.log(this.app);
    this.app.pluginSettingsManager.add('plugin-html-print', {
      title: 'HtmlPrint',
      icon: 'FormOutlined',
      sort: 100,
      Component: PluginSettingsTable,
    });
    this.app.addProvider(PluginSettingsTableProvider);

    this.app.schemaSettingsManager.add(printActionModalSettings);
    this.app.schemaInitializerManager.addItem(
      'details:configureActions',
      'print',
      createPrintActionModalInitializerItem('details'),
    );
    this.app.schemaInitializerManager.addItem(
      'table:configureActions',
      'print',
      createPrintActionModalInitializerItem('table-v2'),
    );
    this.app.schemaInitializerManager.addItem(
      'createForm:configureActions',
      'print',
      createPrintActionModalInitializerItem('form-v2'),
    );
  }
}

export default PluginHtmlPrintClient;
