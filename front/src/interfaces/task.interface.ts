interface ITask {
    task_id: number,
    name: string,
    description: string,
    dateStart: string,
    dateEnd: string,
    category_id: number
}

interface IUpdateTask {
    name: string,
    description: string,
    dateStart: string,
    dateEnd: string,
}

export type {ITask, IUpdateTask}