import { useState } from 'react';

const NewTaskForm = ({ handleSubmit }) => {
  const kDefaultFormState = {
    title: '',
    description: '',
  };

  const [formData, setFormData] = useState({kDefaultFormState});

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name] :event.target.value });
  };

  const onHandleSubmit = (event) => {
    event.preventDefault();
    handleSubmit(formData);
    setFormData(kDefaultFormState);
  };

  return (
    <form onSubmit = {onHandleSubmit}>
      <div>
        <label htmlFor="title"> Task Title: </label>
        <input
          type='text'
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="description"> Task Description: </label>
        <input
          type='text'
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange} />
      </div>
      <input type="submit"value="Add Task" />
    </form>
  );
};

export default NewTaskForm;