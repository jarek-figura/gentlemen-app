import moment from "moment/moment";
import {nameToValue} from "../../_utils/priority";

export default function organizeTasks() {
  const tasks = this.props.tasks.filter(
    task => this.props.isDoneSortMode === '1'
      ? task.isDone === true
      : true
  ).filter(
    task => this.props.isDoneSortMode === '2'
      ? task.isDone === false
      : true
  ).filter(
    task => task.name.toLowerCase().includes(
      this.props.searchPhrase.toLowerCase()
    )
  ).filter(
    task => this.props.showMyDayMode === '1'
      ? moment(task.dueDate).format('YYYY MM DD') === moment().format('YYYY MM DD')
      : task
  ).filter(
    task => this.props.showMyWeekMode === '1'
      ? moment(task.dueDate).format('YYYY MM DD') >= moment().format('YYYY MM DD') &&
          moment(task.dueDate).format('YYYY MM DD') <= moment().add(1, 'week').format('YYYY MM DD')
      : task
  );

  if (this.props.dueDateSortMode === '1') {
    tasks.sort(
      (a, b) => moment(a.dueDate).isBefore(b.dueDate)
        ? -1
        : moment(a.dueDate).isAfter(b.dueDate) ? 1 : 0
    )
  } else if (this.props.dueDateSortMode === '2') {
    tasks.sort(
      (a, b) => moment(a.dueDate).isBefore(b.dueDate)
        ? 1
        : moment(a.dueDate).isAfter(b.dueDate) ? -1 : 0
    )
  }

  if (this.props.prioritySortMode === '1') {
    tasks.sort(
      (a, b) => nameToValue(b.priority) - nameToValue(a.priority)
    )
  } else if (this.props.prioritySortMode === '2') {
    tasks.sort(
      (a, b) => nameToValue(a.priority) - nameToValue(b.priority)
    )
  }

  return tasks
}

/*
const makeDateCompare = (factor = 1) => (a, b) => factor * (
  moment(a.dueDate).isBefore(b.dueDate) ? -1 : moment(a.dueDate).isAfter(b.dueDate) ? 1 : 0
);

const makeValueCompare = (factor = 1) => (a, b) => factor * (
  nameToValue(a.priority) - nameToValue(b.priority)
);

const combineSort = (...sortCallbacks) => (a, b) => sortCallbacks.map(callback => callback(a, b)).find(
  result => result !== 0
) || 0;

const isDoneSortModesCallbacks = [
  () => true,
  task => task.isDone === true,
  task => task.isDone === false
];

const dueDateSortModeCallbacks = [
  () => 1,
  makeDateCompare(1),
  makeDateCompare(-1)
];

const prioritySortModeCallbacks = [
  () => 1,
  makeValueCompare(-1),
  makeValueCompare(1)
];

const searchFilter = searchPhrase => task => task.name.toLowerCase().includes(
  searchPhrase.toLowerCase()
);

export default ({ tasks, isDoneSortMode, searchPhrase, dueDateSortMode, prioritySortMode }) => tasks.filter(
  isDoneSortModesCallbacks[isDoneSortMode]
).filter(
  searchFilter(searchPhrase)
).sort(
  combineSort(
    prioritySortModeCallbacks[prioritySortMode],
    dueDateSortModeCallbacks[dueDateSortMode]
  )
)
*/