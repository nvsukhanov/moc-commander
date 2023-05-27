import { HubType, IOType, PortModeName, PortModeSymbol } from '@nvsukhanov/rxpoweredup';
import { EntityState } from '@ngrx/entity';
import { RouterState } from '@ngrx/router-store';
import { HubIoOperationMode } from './hub-io-operation-mode';
import { PortCommandTask } from '../common';

export interface IState {
    controlSchemes: EntityState<ControlScheme>;
    controlSchemeConfigurationState: {
        isListening: boolean;
    };
    controlSchemeRunningState: {
        runningSchemeId: string | null;
    };
    gamepads: EntityState<GamepadConfig>;
    gamepadAxesState: EntityState<GamepadAxisState>;
    gamepadButtonsState: EntityState<GamepadButtonState>;
    hubs: EntityState<HubConfiguration>,
    hubDiscoveryState: {
        discoveryState: HubDiscoveryState;
    },
    hubAttachedIOs: EntityState<AttachedIO>,
    hubAttachedIOState: EntityState<AttachedIOState>,
    hubIOSupportedModes: EntityState<HubIoSupportedModes>,
    hubPortModeInfo: EntityState<PortModeInfo>,
    hubPortTasks: {
        queue: PortCommandTask[],
        totalTasksExecuted: number,
        lastTaskExecutionTime: number,
        maxQueueLength: number,
        lastExecutedTasks: EntityState<PortCommandTask>
    },
    hubEditFormActiveSaves: {
        hubIds: string[]
    },
    servoCalibrationTaskState: {
        calibrationInProgress: boolean;
    },
    bluetoothAvailability: {
        isAvailable: boolean;
    },
    router: RouterState;
}

export type AttachedIOState = {
    hubId: string;
    portId: number;
    motorEncoderOffset: number | null;
}

export enum HubDiscoveryState {
    Idle = 'Idle',
    Discovering = 'Discovering',
}

export type BindingLinearOutputState = {
    hubId: string;
    portId: number;
    operationMode: HubIoOperationMode.Linear;
    linearConfig: {
        maxSpeed: number;
        isToggle: boolean;
        invert: boolean;
        power: number;
    }
}

export type BindingServoOutputState = {
    hubId: string;
    portId: number;
    operationMode: HubIoOperationMode.Servo;
    servoConfig: {
        range: number;
        aposCenter: number;
        speed: number;
        power: number;
        invert: boolean;
    }
}

export type BindingOutputState = BindingLinearOutputState | BindingServoOutputState;

export type ControlSchemeBinding = {
    id: string;
    input: {
        gamepadId: number;
        gamepadInputMethod: GamepadInputMethod;
        gamepadAxisId: number | null;
        gamepadButtonId: number | null;
    };
    output: BindingOutputState;
}

export type ControlScheme = {
    id: string;
    index: number;
    name: string;
    bindings: ControlSchemeBinding[];
}

export type HubIoSupportedModes = {
    hardwareRevision: string;
    softwareRevision: string;
    ioType: IOType;
    portInputModes: number[];
    portOutputModes: number[];
}

export type HubConfiguration = {
    hubId: string;
    name: string;
    batteryLevel: number | null;
    RSSI: number | null;
    hubType: HubType;
    isButtonPressed: boolean;
    hasCommunication: boolean;
}

export type PortModeInfo = {
    hardwareRevision: string;
    softwareRevision: string;
    modeId: number;
    ioType: IOType;
    name: PortModeName;
    symbol: PortModeSymbol;
}

export type AttachedIO = {
    hubId: string;
    portId: number;
    ioType: IOType;
    hardwareRevision: string;
    softwareRevision: string;
}

export type GamepadConfig = {
    gamepadIndex: number;
    name: string;
    nameL10nKey: string;
    axes: Array<GamepadAxisConfig>;
    buttons: Array<GamepadButtonConfig>;
}

export type GamepadAxisState = {
    gamepadIndex: number;
    axisIndex: number;
    value: number;
}

export type GamepadButtonState = {
    gamepadIndex: number;
    buttonIndex: number;
    value: number;
}

export type GamepadAxisConfig = {
    index: number;
    nameL10nKey: string;
}

export enum GamepadInputMethod {
    Axis,
    Button
}

export enum GamepadButtonType {
    Button,
    Trigger
}

export type GamepadButtonConfig = {
    index: number;
    buttonType: GamepadButtonType;
    nameL10nKey: string;
}

