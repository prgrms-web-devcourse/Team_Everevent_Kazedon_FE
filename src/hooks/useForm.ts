import { useState } from 'react';

interface InitialData<T> {
  initialValues: T;
  onSubmit: (values: T) => void;
  validate?: (errors: T) => T;
}

const useForm = <T>({ initialValues, onSubmit, validate }: InitialData<T>) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<T>(initialValues);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    setIsLoading(true);
    e.preventDefault();

    const newErrors = validate ? validate(values) : initialValues;

    if (Object.keys(newErrors).length === 0) {
      await onSubmit(values);
    }

    setErrors(newErrors);
    setIsLoading(false);
  };

  return {
    values,
    errors,
    isLoading,
    handleChange,
    handleTextareaChange,
    handleSubmit,
  };
};

export default useForm;
