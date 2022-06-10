type Status = 'in-progress' | 'completed';

interface Task {
  _id: string;
  title: string;
  status: Status;
  createdAt: Date;
  completed?: Date;
  priorityIndex: number;
}

interface AddTask {
  title: string;
}

interface EditTask {
  title?: string;
  priorityIndex?: number;
}

interface ErrorType {
  status: number;
  message: string;
}

export { Task, AddTask, EditTask, ErrorType };
