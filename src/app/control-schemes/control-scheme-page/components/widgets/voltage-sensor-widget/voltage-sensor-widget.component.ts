import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { JsonPipe, NgIf } from '@angular/common';
import { PushPipe } from '@ngrx/component';
import { TranslocoPipe } from '@ngneat/transloco';
import { WidgetComponent } from '@app/shared';
import { VoltageWidgetConfigModel } from '@app/store';

import { IControlSchemeWidgetComponent } from '../../widget-container';
import { IVoltageWidgetDataProvider, VOLTAGE_WIDGET_DATA_PROVIDER } from './i-voltage-widget-data-provider';
import { WidgetConnectionInfoL10nService } from '../widget-connection-info-l10n.service';

@Component({
    standalone: true,
    selector: 'app-voltage-sensor-widget',
    templateUrl: './voltage-sensor-widget.component.html',
    styleUrls: [ './voltage-sensor-widget.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        NgIf,
        WidgetComponent,
        PushPipe,
        JsonPipe,
        TranslocoPipe
    ]
})
export class VoltageSensorWidgetComponent implements IControlSchemeWidgetComponent<VoltageWidgetConfigModel> {
    private _subtitle$: Observable<string> = of('');

    private _config?: VoltageWidgetConfigModel;

    private _voltage$: Observable<number | null> = of(null);

    constructor(
        private readonly cdRef: ChangeDetectorRef,
        @Inject(VOLTAGE_WIDGET_DATA_PROVIDER) private readonly dataProvider: IVoltageWidgetDataProvider,
        private readonly widgetConnectionInfoL10nService: WidgetConnectionInfoL10nService
    ) {
    }

    public set config(
        config: VoltageWidgetConfigModel
    ) {
        if (config !== this._config) {
            if (config.hubId !== this._config?.hubId || config.portId !== this._config?.portId) {
                this._voltage$ = this.dataProvider.getVoltage(config.hubId, config.portId);
                this._subtitle$ = this.widgetConnectionInfoL10nService.getConnectionInfo(config.widgetType, config.hubId, config.portId);
            }
            this._config = config;
            this.cdRef.markForCheck();
        }
    }

    public get config(): VoltageWidgetConfigModel {
        if (!this._config) {
            throw new Error('Config is not defined');
        }
        return this._config;
    }

    public get subtitle$(): Observable<string> {
        return this._subtitle$;
    }

    public get voltage$(): Observable<number | null> {
        return this._voltage$;
    }
}
