import PropTypes from 'prop-types';

import './Task.css';

const Task = ({ id, title, isComplete, onTaskToggled, onUnregisterTask }) => {
  const buttonClass = isComplete ? 'tasks__item__toggle--completed' : '';

  const onTaskClicked = () => {
    onTaskToggled(id);
  };

  const onUnregisterClicked = () => {
    onUnregisterTask(id);
  };

  return (
    <li className="tasks__item">
      <button
        className={`tasks__item__toggle ${buttonClass}`}
        onClick={onTaskClicked}
      >
        {title}
      </button>
      <button
      className="tasks__item__remove button"
      onClick={onUnregisterClicked}>
      x</button>
    </li>
  );
};

Task.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  isComplete: PropTypes.bool.isRequired,
  onTaskToggled: PropTypes.func.isRequired,
  onUnregisterTask: PropTypes.func.isRequired,
};

export default Task;
