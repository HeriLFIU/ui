import Vue from 'vue'
import { createApp } from 'vue'
import { configureCompat } from 'vue'
import VueHotkey from 'v-hotkey3'
import App from './App.vue'
import * as packageInfo from '../package.json';
import eventBus from './event-bus'
import { toRaw } from 'vue'
import { defineAsyncComponent } from 'vue'

const {version} = packageInfo;

import { loadModule } from "vue3-sfc-loader";

const options = {

  moduleCache: {
    vue: Vue
  },

  getFile(url) {

    return fetch(url).then(response => response.ok ? response.text() : Promise.reject(response));
  },

  addStyle(styleStr) {

    const style = document.createElement('style');
    style.textContent = styleStr;
    const ref = document.head.getElementsByTagName('style')[0] || null;
    document.head.insertBefore(style, ref);
  }

}


const kytos = createApp({
  el: '#app',
  render: () => Vue.h(App),
  data () {
    return {
        infoPanelView: undefined
    }
  },
})

Vue.use(VueHotkey)

window.$ = window.jQuery = require('jquery');
window.d3 = window.D3 = require('d3');

import KytosToolbarItem from './components/kytos/misc/ToolbarItem.vue';
import KytosToolbar from './components/kytos/napp/Toolbar.vue';
import KytosNappsInfoPanel from './components/kytos/napp/NappsInfoPanel.vue';
import KytosActionMenuItem from './components/kytos/napp/ActionMenuItem.vue';
import KytosMap from './components/kytos/map/Map.vue';
import KytosTopology from './components/kytos/topology/Topology.vue';
import KytosTabs from './components/kytos/tabs/tabs.vue';
import KytosTerminal from './components/kytos/terminal/Terminal.vue';
import KytosLogging from './components/kytos/logging/Logging.vue';
import KytosButton from './components/kytos/inputs/buttons/Button.vue';
import KytosButtonGroup from './components/kytos/inputs/buttons/ButtonGroup.vue';
import KytosDropdown from './components/kytos/inputs/Dropdown.vue';
import KytosContextPanel from './components/kytos/misc/ContextPanel.vue';
import KytosMenubar from './components/kytos/misc/Menubar.vue';
import KytosModal from './components/kytos/misc/Modal.vue';
import KytosActionMenu from './components/kytos/misc/ActionMenu.vue';
import KytosInfoPanel from './components/kytos/misc/InfoPanel.vue';
import KytosStatusBar from './components/kytos/misc/StatusBar.vue';
import KytosInput from './components/kytos/inputs/Input.vue';
import KytosInputAutocomplete from './components/kytos/inputs/InputAutocomplete.vue';
import KytosStatusMenu from './components/kytos/misc/StatusMenu.vue';

import KytosTextarea from './components/kytos/inputs/Textarea.vue';
import KytosCheckbox from './components/kytos/inputs/Checkbox.vue';
import MapBoxSettings from './components/kytos/map/MapBoxSettings.vue';

import KytosSelect from './components/kytos/inputs/Select.vue';
import KytosSlider from './components/kytos/inputs/Slider.vue';
import KytosAccordion from './components/kytos/accordion/Accordion.vue';
import KytosAccordionItem from './components/kytos/accordion/AccordionItem.vue';
import KytosPropertyPanel from './components/kytos/ppanel/PropertyPanel.vue';
import KytosPropertyPanelItem from './components/kytos/ppanel/PropertyPanelItem.vue';

import KytosInterface from './components/kytos/switch/Interface.vue';
import KytosFlow from './components/kytos/switch/Flow.vue';

import KytosSwitchRadar from './kytos/switchRadar.vue';
import KytosInterfaceInfo from './kytos/interfaceInfo.vue';

import KytosChartTimeseries from './components/kytos/chart/Timeseries.vue';
import KytosChartRadar from './components/kytos/chart/RadarChart.vue';

import KytosTable from './components/kytos/table/Table.vue';

import KytosNotification from "./components/kytos/misc/Notification.vue";

import { library, dom } from "@fortawesome/fontawesome-svg-core";
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

library.add(fas, far, fab)
dom.watch();

kytos.component('k-menubar', KytosMenubar);
kytos.component('k-modal', KytosModal);
kytos.component('k-map', KytosMap);
kytos.component('mapbox-settings', MapBoxSettings);
kytos.component('k-topology', KytosTopology);
kytos.component('k-context-panel', KytosContextPanel);
kytos.component('k-tabs', KytosTabs);
kytos.component('k-terminal', KytosTerminal);
kytos.component('k-logging', KytosLogging);
kytos.component('k-button', KytosButton);
kytos.component('k-dropdown', KytosDropdown);
kytos.component('k-button-group', KytosButtonGroup);
kytos.component('k-action-menu', KytosActionMenu);
kytos.component('k-input', KytosInput);
kytos.component('k-input-auto', KytosInputAutocomplete);
kytos.component('k-textarea', KytosTextarea);
kytos.component('k-checkbox', KytosCheckbox);
kytos.component('k-status-bar', KytosStatusBar);
kytos.component('k-status-menu', KytosStatusMenu);

kytos.component('k-select', KytosSelect)
kytos.component('k-slider', KytosSlider);
kytos.component('k-accordion', KytosAccordion);
kytos.component('k-accordion-item', KytosAccordionItem);
kytos.component('k-property-panel', KytosPropertyPanel);
kytos.component('k-property-panel-item', KytosPropertyPanelItem);
kytos.component('k-info-panel', KytosInfoPanel);
kytos.component('k-toolbar', KytosToolbar);
kytos.component('k-toolbar-item', KytosToolbarItem);
kytos.component('k-action-menu-item', KytosActionMenuItem);
kytos.component('k-napps-info-panel', KytosNappsInfoPanel);

kytos.component('k-interface', KytosInterface);
kytos.component('k-flow', KytosFlow);

kytos.component('k-switch-radar', KytosSwitchRadar);
kytos.component('k-interface-info', KytosInterfaceInfo);

kytos.component('k-chart-timeseries', KytosChartTimeseries)
kytos.component('k-chart-radar', KytosChartRadar)

kytos.component('k-table', KytosTable)
kytos.component('k-notification', KytosNotification)

// if (DEVELOPMENT){
//   // kytos.component('mef-eline', defineAsyncComponent(() =>
//   //   import('./components/dev/napps/mefeline')
//   // ))
//   // kytos.component('telemetry-int', defineAsyncComponent(() =>
//   //   import('./components/MyComponent.vue')
//   // ))
//   // kytos.component('pathfinder', defineAsyncComponent(() =>
//   //   import('./components/MyComponent.vue')
//   // ))
//   // kytos.component('maintenance', defineAsyncComponent(() =>
//   //   import('./components/MyComponent.vue')
//   // ))
//   // kytos.component('sdntrace-cp', defineAsyncComponent(() =>
//   //   import('./components/MyComponent.vue')
//   // ))
//   kytos.component('topology-link-info', defineAsyncComponent(() =>
//     import('./components/dev/napps/topology/k-info-panel/link_info.kytos')
//   ))
//   kytos.component('goober', defineAsyncComponent(() =>
//     import('./components/dev/napps/topology/k-info-panel/switch_info.kytos')
//   ))
//   kytos.component('topology-search-switch', defineAsyncComponent(() =>
//     import('./components/dev/napps/topology/k-action-menu/search_switch.kytos')
//   ))
//   kytos.component('sdntrace', defineAsyncComponent(() =>
//     import('./components/dev/napps/sdntrace/k-toolbar/main.kytos')
//   ))
//   kytos.component('amlight-sdntrace-k-info-panel-show_all_traces', defineAsyncComponent(() =>
//     import('./components/dev/napps/sdntrace/k-info-panel/show_all_traces.kytos')
//   ))
//   ))
// }

// console.log(loadModule('http://localhost:8181/ui/amlight/sdntrace_cp/k-toolbar/main.vue', options))
// kytos.component('component', Vue.defineAsyncComponent( () => loadModule('http://localhost:8181/ui/amlight/sdntrace_cp/k-toolbar/main.vue', options) ))

kytos.component('kytos-mef_eline-k-toolbar-main', defineAsyncComponent(() =>
    import('./components/dev/napps/mef_eline/k-toolbar/main.kytos')
))
// Preserve extra whitespaces
kytos.config.compilerOptions.whitespace = 'preserve';

kytos.config.globalProperties.$kytos = kytos
kytos.config.globalProperties.$kytos_server = window.kytos_server
kytos.config.globalProperties.$kytos_server_api =  window.kytos_server_api
kytos.config.globalProperties.$kytos_version = version
kytos.config.globalProperties.$kytos.eventBus = eventBus;
kytos.config.globalProperties.$kytos.toRaw = toRaw;

kytos.config.globalProperties.$filters = {
  humanize_bytes(num, precision = 0, suffix = 'bps') {
    num = Number(num);
    if (isNaN(num)) {
      throw new TypeError('Expected a number');
    }

    var neg = num < 0;
    var units = ['', 'k', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'];

    if (neg) {
      num = -num;
    }

    if (num < 1) {
      return (neg ? '-' : '') + num + ' ' + suffix;
    }

    var exponent = Math.min(Math.floor(Math.log(num) / Math.log(1000)), units.length - 1);
    num = (num / Math.pow(1000, exponent)).toFixed(precision) * 1;
    var unit = units[exponent] + suffix;

    return (neg ? '-' : '') + num + ' ' + unit;
  }
}

configureCompat({
  RENDER_FUNCTION: false
})

kytos.mount('#app')