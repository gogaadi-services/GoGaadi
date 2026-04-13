import { useEffect, useRef, useState, useCallback } from 'react';
import { FormikConfig, FormikValues } from 'formik';
import { useForm } from './useForm';

function useSessionStorage<T>(key: string, initialValue: T): [T, (value: T) => void, () => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.sessionStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value: T) => {
      try {
        setStoredValue(value);
        window.sessionStorage.setItem(key, JSON.stringify(value));
      } catch {}
    },
    [key],
  );

  const removeValue = useCallback(() => {
    try {
      setStoredValue(initialValue);
      window.sessionStorage.removeItem(key);
    } catch {}
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return [storedValue, setValue, removeValue];
}

/**
 * Wraps useForm with sessionStorage persistence.
 * Form values are saved to sessionStorage on every change and restored on mount.
 * On successful submit or resetForm, sessionStorage is cleared.
 *
 * @param storageKey - Unique key for sessionStorage
 * @param config - Standard Formik config (initialValues, validationSchema, onSubmit, etc.)
 */
export function useFormWithSessionStorage<T extends FormikValues = FormikValues>(
  storageKey: string,
  config: FormikConfig<T>,
) {
  const [storedValues, setStoredValues, removeStoredValues] = useSessionStorage<Partial<T> | null>(
    `form_${storageKey}`,
    null,
  );

  // Merge stored values into initialValues
  const mergedInitialValues: T = storedValues
    ? { ...config.initialValues, ...storedValues }
    : config.initialValues;

  const formik = useForm<T>({
    ...config,
    initialValues: mergedInitialValues,
    onSubmit: async (values, helpers) => {
      await config.onSubmit(values, helpers);
      removeStoredValues();
    },
  });

  // Track previous values to avoid unnecessary writes
  const prevValuesRef = useRef<string>(JSON.stringify(formik.values));

  // Persist form values to sessionStorage on change
  useEffect(() => {
    const serialized = JSON.stringify(formik.values);
    if (serialized !== prevValuesRef.current) {
      prevValuesRef.current = serialized;
      setStoredValues(formik.values);
    }
  }, [formik.values, setStoredValues]);

  // Wrap resetForm to also clear sessionStorage
  const originalResetForm = formik.resetForm;
  const resetForm: typeof formik.resetForm = (...args) => {
    removeStoredValues();
    originalResetForm(...args);
  };

  return { ...formik, resetForm, clearSessionStorage: removeStoredValues };
}
