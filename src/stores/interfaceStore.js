import { defineStore } from 'pinia';
import http_helpers from '../helpers/http-helpers';

export const useInterfaceStore = defineStore('interfaceData', {
    state: () => ({
        _this: null,
        kytos_server_api: location.protocol + '//' + location.host + '/api/',
        interfaceChartData: {},
        pollingInterval: null,
        isStale: false
    }),
    actions: {
        async updateData() {
            await this.fetchPortStats();
        },
        async fetchPortStats() {
            try {
                let url = this.kytos_server_api + 'amlight/kytos_stats/v1/port/stats';
                const response = await this._this.$http.get(url);
                if (Object.keys(response.data).length > 0 && response.data) {
                    let response_data = structuredClone(response.data);
                    if (Object.keys(this.interfaceChartData).length === 0) {
                        let data = structuredClone(response.data);
                        Object.keys(data).forEach((switchID) => {
                            Object.keys(data[switchID]).forEach((portNum) => {
                                data[switchID][portNum] = [];
                            });
                        });
                        this.interfaceChartData = data;
                    }
                    Object.keys(response_data).forEach((switchID) => {
                        Object.keys(response_data[switchID]).forEach((portNum) => {
                            this.interfaceChartData[switchID][portNum].push(
                                response_data[switchID][portNum]
                            );
                            let size =
                                this.interfaceChartData[switchID][portNum].length - 1;
                            this.interfaceChartData[switchID][portNum][size].timestamp =
                                new Date(
                                    this.interfaceChartData[switchID][portNum][
                                        size
                                    ].updated_at
                                );
                            delete this.interfaceChartData[switchID][portNum][size]
                                .updated_at;
                            if (this.interfaceChartData[switchID][portNum].length > 7) {
                                this.interfaceChartData[switchID][portNum].shift();
                            }
                        });
                    });
                    let switches = Object.keys(this.interfaceChartData);
                    let ports = Object.keys(this.interfaceChartData[switches[0]]);
                    let array_size = this.interfaceChartData[switches[0]][ports[0]].length;
                    let first_switch_stats = this.interfaceChartData[switches[0]][ports[0]];
                    if (first_switch_stats.length > 1) {
                        if (
                            first_switch_stats[array_size - 1].timestamp.getTime() ===
                            first_switch_stats[array_size - 2].timestamp.getTime()
                        ) {
                            this.isStale = true;
                        } else {
                            this.isStale = false;
                        }
                    }
                }
            } catch (err) {
                if (this._this.$http.isAxiosError(err)) {
                    http_helpers.post_error(
                        this._this,
                        err,
                        'Could not get port stats data'
                    );
                } else {
                    throw err;
                }
            }
        },
        startPolling(_this) {
            this._this = _this;
            if (this.pollingInterval) {
                clearInterval(this.pollingInterval);
            }

            this.updateData();
            this.pollingInterval = setInterval(() => {
                this.updateData();
            }, 60000);
        },
        stopPolling() {
            if (this.pollingInterval) {
                clearInterval(this.pollingInterval);
                this.pollingInterval = null;
            }
        }
    }
});
