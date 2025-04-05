/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { Plugin, SchemaInitializerItem, SchemaSettings, useSchemaInitializer } from '@nocobase/client';
import { PluginSettingsTableProvider } from './PluginSettingsTableProvider';
import { PluginSettingsTable } from './PluginSettingsTable';

export class PluginHtmlPrintClient extends Plugin {
  async afterAdd() {
    // await this.app.pm.add()
  }

  async beforeLoad() {}

  // You can get and modify the app instance here
  async load() {
    console.log(this.app);
    this.app.pluginSettingsManager.add('plugin-html-print', {
      title: 'HtmlPrint',
      icon: 'FormOutlined',
      sort: 100,
      Component: PluginSettingsTable,
    });
    this.app.addProvider(PluginSettingsTableProvider);

    // const initializerData = {
    //   title: '{{t("Print")}}',
    //   Component: 'PrintActionInitializer',
    //   schema: {
    //     'x-component': 'Action',
    //     'x-toolbar': 'ActionSchemaToolbar',
    //     'x-settings': 'actionSettings:print',
    //     'x-action': 'print',
    //   },
    // };

    // this.app.schemaInitializerManager.addItem('details:configureActions', 'enableActions.print', initializerData);
    // this.app.schemaInitializerManager.addItem('CalendarFormActionInitializers', 'enableActions.print', initializerData);
  }
}

export default PluginHtmlPrintClient;
