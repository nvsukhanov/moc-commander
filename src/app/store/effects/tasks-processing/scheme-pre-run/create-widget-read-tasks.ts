import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { ControlSchemeModel, WidgetType } from '../../../models';
import { createVoltageReaderTask } from './widget-read-tasks';
import { HubStorageService } from '../../../hub-storage.service';

export function createWidgetReadTasks(
    scheme: ControlSchemeModel,
    hubStorage: HubStorageService,
    store: Store,
    schemeStop$: Observable<unknown>
): Array<Observable<unknown>> {
    const result: Array<Observable<unknown>> = [];
    for (const widgetConfig of scheme.widgets) {
        switch (widgetConfig.widgetType) {
            case WidgetType.Voltage:
                result.push(createVoltageReaderTask(widgetConfig, store, hubStorage, schemeStop$));
        }
    }
    return result;
}
