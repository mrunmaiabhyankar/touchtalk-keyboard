// Utility functions for Google Analytics event reporting

export function reportCharacterError(inputChar: string, taskId: number) {
    window.gtag?.("event", "error_character", {
        event_category: "Task Interaction",
        event_label: inputChar,
        value: 1,
        task_id: taskId,
    })
}

export function reportTaskCompleted(success: boolean, taskId: number) {
    window.gtag?.("event", "task_completed", {
        event_category: "Task Performance",
        event_label: `Task ${taskId} complete: ${success}`,
        value: 1,
        task_id: taskId,
    })
}

export function reportTimeOnTask(duration: number, taskId: number) {
    window.gtag?.("event", "time_on_task", {
        event_category: "Task Interaction",
        event_label: "Task duration",
        value: duration,
        task_id: taskId,
    })
}

export function reportErrorRate(errors: number, taskId: number) {
    window.gtag?.("event", "error_rate", {
        event_category: "Task Performance",
        event_label: `Task ${taskId}`,
        value: errors,
        task_id: taskId,
    })
}