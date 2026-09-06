export function FormSection({ title, description, children }) {
  return (
    <fieldset className="space-y-4 border border-gray-200 rounded-lg p-4">
      <legend className="px-2 text-sm font-semibold text-gray-900">
        {title}
      </legend>
      {description && (
        <p className="text-sm text-gray-500">{description}</p>
      )}
      <div className="space-y-4">{children}</div>
    </fieldset>
  )
}