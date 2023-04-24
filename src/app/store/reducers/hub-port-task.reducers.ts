/* eslint-disable @ngrx/on-function-explicit-return-type */
import { createReducer, on } from '@ngrx/store';
import { INITIAL_STATE } from '../initial-state';
import { HUB_PORT_TASKS_ACTIONS } from '../actions/hub-port-tasks.actions';
import { LAST_EXECUTED_TASKS_ENTITY_ADAPTER } from '../entity-adapters';

export const HUB_PORT_TASK_REDUCERS = createReducer(
    INITIAL_STATE['hubPortTasks'],
    on(HUB_PORT_TASKS_ACTIONS.setQueue, (state, { tasks }) => {
        return {
            ...state,
            queue: tasks
        };
    }),
    on(HUB_PORT_TASKS_ACTIONS.markTaskAsExecuted, (state, { task }) => {
        const taskExecutionDuration = Date.now() - task.createdAt;
        return {
            ...state,
            queue: state.queue.filter((t) => t !== task),
            totalTasksExecuted: state.totalTasksExecuted + 1,
            lastTaskExecutionTime: taskExecutionDuration,
            maxQueueLength: Math.max(state.maxQueueLength, state.queue.length),
            lastExecutedTasks: LAST_EXECUTED_TASKS_ENTITY_ADAPTER.upsertOne(task, state.lastExecutedTasks)
        };
    }),
);
