import { cn } from '@utils/helpers';

/**
 * Input Component
 * Reusable input field with error handling and labels
 */
const Input = ({
  label,
  error,
  type = 'text',
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  disabled = false,
  required = false,
  className,
  inputClassName,
  ...props
}) => {
  const hasError = Boolean(error);
  
  return (
    <div className={cn('w-full', className)}>
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        className={cn(
          'input',
          hasError && 'input-error',
          disabled && 'bg-gray-100 cursor-not-allowed',
          inputClassName
        )}
        aria-invalid={hasError}
        aria-describedby={hasError ? `${name}-error` : undefined}
        {...props}
      />
      
      {hasError && (
        <p
          id={`${name}-error`}
          className="mt-1 text-sm text-red-600"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;
