import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { NgIf } from '@angular/common';
import { TranslocoPipe } from '@ngneat/transloco';
import { RouterLink } from '@angular/router';
import { RoutesBuilderService } from '@app/shared-misc';
import { EllipsisTitleDirective, FeatureToolbarControlsDirective, HubTypeToL10nKeyPipe } from '@app/shared-ui';
import { HubModel, HubRuntimeDataModel } from '@app/store';

@Component({
    standalone: true,
    selector: 'app-hub-properties-view',
    templateUrl: './hub-properties-view.component.html',
    styleUrls: [ './hub-properties-view.component.scss' ],
    imports: [
        MatButtonModule,
        MatCardModule,
        NgIf,
        TranslocoPipe,
        RouterLink,
        EllipsisTitleDirective,
        FeatureToolbarControlsDirective,
        HubTypeToL10nKeyPipe
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HubPropertiesViewComponent {
    @Output() public readonly disconnect = new EventEmitter<void>();

    @Input() public runtimeData?: HubRuntimeDataModel;

    private _hubEditRoute: string[] = [];

    private _configuration: HubModel | undefined;

    constructor(
        private readonly routesBuilderService: RoutesBuilderService,
    ) {
    }

    @Input()
    public set configuration(value: HubModel | undefined) {
        this._configuration = value;
        this._hubEditRoute = value === undefined ? [] : this.routesBuilderService.hubEdit(value.hubId);
    }

    public get configuration(): HubModel | undefined {
        return this._configuration;
    }

    public get hubEditRoute(): string[] {
        return this._hubEditRoute;
    }

    public onDisconnect(): void {
        this.disconnect.emit();
    }
}
