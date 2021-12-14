import { useState } from 'react';

interface InitialData<T> {
  initialValues: T;
  onSubmit: (values: T) => void;
  validate?: (errors: T) => Partial<T>;
}

const useForm = <T>({ initialValues, onSubmit, validate }: InitialData<T>) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<T>>(initialValues);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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
      return;
    }

    setErrors(newErrors);
    setIsLoading(false);
  };

  return {
    values,
    errors,
    isLoading,
    setErrors,
    handleChange,
    handleSubmit,
  };
};

export default useForm;
