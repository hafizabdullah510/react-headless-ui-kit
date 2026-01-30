# React Form Components Library

A lightweight, accessible, and TypeScript-first form component library built with React and Tailwind CSS.

## Features

- 🎨 **Tailwind CSS** - Fully styled with utility classes
- ♿ **Accessible** - ARIA attributes, keyboard navigation, screen reader support
- 📦 **TypeScript** - Full type safety with comprehensive types
- 🎯 **Controlled & Uncontrolled** - Supports both patterns seamlessly
- 🔄 **Polymorphic Button** - Can render as `<button>` or `<a>`
- 🎪 **Generic Select** - Type-safe select with any object type
- ✨ **Loading States** - Built-in spinner and loading text support
- 🎭 **Flexible Styling** - Override styles via className prop
- 📱 **Responsive** - Three sizes (sm, md, lg) for all components

## Components

- **Button** - Versatile button with loading states and icon support
- **Input** - Text input with label and error handling
- **Select** - Generic dropdown with type-safe options
- **Spinner** - Loading indicator (used internally by Button)

---

## Installation

```bash
npm install react
npm install -D tailwindcss
```

**Required Peer Dependencies:**

- React 18+
- Tailwind CSS 3+

**Tailwind Configuration:**

Ensure your `tailwind.config.js` includes the component paths:

```js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    // Add your components path here
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

---

## Usage

### Button

A polymorphic button component that can render as either a `<button>` or `<a>` element.

#### Basic Usage

```tsx
import { Button } from "./components/Button/Button";

function App() {
  return <Button onClick={() => console.log("clicked")}>Click Me</Button>;
}
```

#### As Link

```tsx
<Button as="a" href="https://example.com">
  Visit Site
</Button>
```

#### With Icons

```tsx
import { ChevronRight, Download } from 'lucide-react';

<Button leftIcon={<Download size={16} />}>
  Download
</Button>

<Button rightIcon={<ChevronRight size={16} />}>
  Next
</Button>
```

#### Loading State

```tsx
<Button loading={true} loadingText="Saving...">
  Save
</Button>

// Or with custom loading text
<Button loading={isSubmitting} loadingText="Processing...">
  Submit Form
</Button>
```

#### Variants & Sizes

```tsx
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>

<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
```

#### Props

| Prop          | Type                                  | Default        | Description                       |
| ------------- | ------------------------------------- | -------------- | --------------------------------- |
| `variant`     | `'primary' \| 'secondary' \| 'ghost'` | `'primary'`    | Button style variant              |
| `size`        | `'sm' \| 'md' \| 'lg'`                | `'md'`         | Button size                       |
| `loading`     | `boolean`                             | `false`        | Shows spinner and disables button |
| `loadingText` | `string`                              | `'Loading...'` | Text shown during loading         |
| `leftIcon`    | `React.ReactNode`                     | -              | Icon displayed before text        |
| `rightIcon`   | `React.ReactNode`                     | -              | Icon displayed after text         |
| `disabled`    | `boolean`                             | `false`        | Disables the button               |
| `as`          | `'button' \| 'a'`                     | `'button'`     | Render as button or anchor        |
| `href`        | `string`                              | -              | Required when `as="a"`            |
| `type`        | `'button' \| 'submit' \| 'reset'`     | `'button'`     | HTML button type                  |
| `className`   | `string`                              | -              | Additional CSS classes            |

---

### Input

A text input component with label, error handling, and validation support.

#### Basic Usage

```tsx
import { Input } from "./components/Input/Input";

function App() {
  const [value, setValue] = useState("");

  return (
    <Input
      label="Email"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Enter your email"
    />
  );
}
```

#### Uncontrolled

```tsx
<Input label="Username" defaultValue="john_doe" name="username" />
```

#### With Error

```tsx
<Input
  label="Password"
  type="password"
  error={<span className="text-red-600 text-sm">Password is required</span>}
/>
```

#### Required Field

```tsx
<Input
  label="Full Name"
  required
  showRequiredIndicator // Shows asterisk (*)
/>
```

#### Custom Styling

```tsx
<Input
  label="Custom Input"
  labelStyle="text-purple-600 font-bold"
  className="border-purple-500 focus:border-purple-700"
/>
```

#### Props

| Prop                     | Type                       | Default | Description                        |
| ------------------------ | -------------------------- | ------- | ---------------------------------- |
| `label`                  | `string`                   | -       | Label text                         |
| `labelStyle`             | `string`                   | -       | Custom CSS classes for label       |
| `error`                  | `React.ReactNode`          | -       | Error message or component         |
| `size`                   | `'sm' \| 'md' \| 'lg'`     | `'md'`  | Input size                         |
| `showRequiredIndicator`  | `boolean`                  | `false` | Shows asterisk for required fields |
| `value`                  | `string`                   | -       | Controlled value                   |
| `defaultValue`           | `string`                   | -       | Uncontrolled default value         |
| `onChange`               | `(e: ChangeEvent) => void` | -       | Change handler                     |
| `className`              | `string`                   | -       | Additional CSS classes             |
| ...HTML input attributes | -                          | -       | All standard input props           |

---

### Select

A generic, type-safe select component that works with any object type.

#### Basic Usage

```tsx
import { Select } from "./components/Select/Select";

type Fruit = {
  id: number;
  name: string;
  color: string;
};

const fruits: Fruit[] = [
  { id: 1, name: "Apple", color: "red" },
  { id: 2, name: "Banana", color: "yellow" },
  { id: 3, name: "Orange", color: "orange" },
];

function App() {
  const [selected, setSelected] = useState<Fruit | null>(null);

  return (
    <Select
      label="Choose a fruit"
      options={fruits}
      value={selected}
      onChange={setSelected}
      getLabel={(fruit) => fruit.name}
      getValue={(fruit) => fruit.id}
      placeholder="Select a fruit..."
    />
  );
}
```

#### With Custom Key

```tsx
<Select
  options={users}
  getLabel={(user) => user.fullName}
  getValue={(user) => user.id}
  getKey={(user) => user.uuid} // Use UUID instead of id
/>
```

#### Uncontrolled

```tsx
<Select
  label="Country"
  options={countries}
  defaultValue={countries[0]}
  onChange={(country) => console.log(country)}
  getLabel={(c) => c.name}
  getValue={(c) => c.code}
/>
```

#### With Error

```tsx
<Select
  label="Department"
  options={departments}
  error={<span className="text-red-600">Please select a department</span>}
  getLabel={(d) => d.name}
  getValue={(d) => d.id}
/>
```

#### Required Field

```tsx
<Select
  label="Role"
  required
  showRequiredIndicator
  options={roles}
  getLabel={(r) => r.title}
  getValue={(r) => r.id}
/>
```

#### Props

| Prop                      | Type                            | Default      | Description                        |
| ------------------------- | ------------------------------- | ------------ | ---------------------------------- |
| `label`                   | `string`                        | -            | Label text                         |
| `labelStyle`              | `string`                        | -            | Custom CSS classes for label       |
| `error`                   | `React.ReactNode`               | -            | Error message or component         |
| `size`                    | `'sm' \| 'md' \| 'lg'`          | `'md'`       | Select size                        |
| `placeholder`             | `string`                        | -            | Placeholder option text            |
| `showRequiredIndicator`   | `boolean`                       | `false`      | Shows asterisk for required fields |
| `options`                 | `T[]`                           | **Required** | Array of options                   |
| `value`                   | `T \| null`                     | -            | Controlled selected value          |
| `defaultValue`            | `T \| null`                     | -            | Uncontrolled default value         |
| `onChange`                | `(item: T \| null) => void`     | -            | Change handler                     |
| `getLabel`                | `(item: T) => string`           | **Required** | Extract display label              |
| `getValue`                | `(item: T) => string \| number` | **Required** | Extract option value               |
| `getKey`                  | `(item: T) => string \| number` | -            | Custom key extractor (optional)    |
| `className`               | `string`                        | -            | Additional CSS classes             |
| ...HTML select attributes | -                               | -            | All standard select props          |

---

## Select Component - Important Notes

The Select component uses an **object-based abstraction** for type safety and better developer experience.

### ⚠️ TypeScript Type Annotation Required

When using controlled Select with an initial value of `null`, you **must** provide an explicit type annotation:

```typescript
// ✅ CORRECT
const [country, setCountry] = useState<Country | null>(null);

// ❌ WRONG - TypeScript can't infer the type
const [country, setCountry] = useState(null);
```

### Why Object-Based?

Instead of working with primitive values, the Select component works with full objects:

```typescript
// Traditional select - only get the ID
onChange={(e) => {
  const id = e.target.value;  // Just a string
  // Need to find the full object manually
}}

// Our Select - get the full object immediately
onChange={(country) => {
  console.log(country.name);  // ✅ All properties available
  console.log(country.code);  // ✅ No lookup needed
}}
```

---

### 💡 TypeScript Tip: Handling Nullable State

The `Select` component is designed to be **clearable**, supporting a "no selection" state. Consequently, the `onChange` callback and the `value` prop are typed as `T | null`.

A common issue arises when initializing `useState` with a default object. TypeScript infers the state type strictly as that object, creating a mismatch when the component tries to pass `null` back to your state setter.

#### Comparison: Inference vs. Explicit Typing

```tsx
interface Department {
  id: string;
  name: string;
  category: string;
}

// ❌ WRONG: Implicit Inference
// TS thinks 'department' can ONLY be an object.
const [department, setDepartment] = useState({
  id: "",
  name: "",
  category: "",
});

// This will trigger:
// Error: Type 'null' is not assignable to type 'SetStateAction<{...}>'
<Select value={department} onChange={(d) => setDepartment(d)} {...props} />;

// ✅ RIGHT: Explicit Type Union
// This allows the state to hold the object OR be null.
const [department, setDepartment] = useState<Department | null>(null);

// Works perfectly with the Select's internal logic
<Select<Department> value={department} onChange={setDepartment} {...props} />;
```

---

## Styling

### Default Styles

All components come with sensible defaults:

- **Focus states**: Blue ring on focus
- **Error states**: Red border and error message
- **Disabled states**: Reduced opacity and no-pointer cursor
- **Sizes**: Three sizes with consistent spacing

### Customization

#### Override Styles

```tsx
<Input
  className="border-purple-500 focus:border-purple-700 bg-gray-50"
/>

<Button
  className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
>
  Gradient Button
</Button>
```

#### Modify Base Styles

Edit the style files to change defaults:

```typescript
// form.styles.ts
export const formStyles = {
  base: `
    block w-full rounded-lg border border-gray-300
    // Add your custom base styles here
  `,
  // ...
};
```

---

## Accessibility

All components follow accessibility best practices:

### Button

- ✅ `aria-busy` for loading state
- ✅ `aria-disabled` for disabled state
- ✅ Keyboard navigation support
- ✅ Screen reader labels for spinner

### Input & Select

- ✅ `aria-invalid` for error state
- ✅ `aria-describedby` linking errors
- ✅ `role="alert"` on error messages
- ✅ `aria-hidden` on decorative asterisks
- ✅ Proper label association with `htmlFor`
- ✅ Auto-generated IDs for accessibility

---

## Advanced Usage

### Form Integration (React Hook Form)

```tsx
import { useForm } from "react-hook-form";
import { Input, Select, Button } from "./components";

type FormData = {
  name: string;
  country: Country;
};

function MyForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Name"
        {...register("name", { required: "Name is required" })}
        error={errors.name?.message}
      />

      <Button type="submit">Submit</Button>
    </form>
  );
}
```

### Custom Error Components

```tsx
// Custom error component with icon
const CustomError = ({ message }: { message: string }) => (
  <div className="flex items-center gap-1 text-red-600 text-sm mt-1">
    <AlertCircle size={14} />
    <span>{message}</span>
  </div>
);

<Input label="Email" error={<CustomError message="Invalid email format" />} />;
```

### Dynamic Form Fields

```tsx
function DynamicSelect() {
  const [options, setOptions] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchOptions().then((data) => {
      setOptions(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <Spinner />;

  return (
    <Select
      options={options}
      getLabel={(item) => item.name}
      getValue={(item) => item.id}
    />
  );
}
```

---

## API Reference

### Controlled vs Uncontrolled

Both Input and Select support controlled and uncontrolled patterns:

**Controlled:**

```tsx
const [value, setValue] = useState("");
<Input value={value} onChange={(e) => setValue(e.target.value)} />;
```

**Uncontrolled:**

```tsx
<Input defaultValue="initial" name="field" />
```

⚠️ **Warning:** Don't use both `value` and `defaultValue` together. A console warning will appear in development mode.

### Type Safety

The Select component is fully generic:

```tsx
// TypeScript knows selectedUser is User | null
const [selectedUser, setSelectedUser] = useState<User | null>(null);

<Select<User>
  options={users}
  value={selectedUser}
  onChange={setSelectedUser}
  getLabel={(user) => user.name} // ✅ TypeScript autocomplete
  getValue={(user) => user.id} // ✅ TypeScript autocomplete
/>;
```

---

## Constraints & Limitations

### Tailwind CSS Required

- Components use Tailwind utility classes
- Must have Tailwind CSS configured in your project
- Some arbitrary values (like `bg-[url(...)]`) require JIT mode (enabled by default in Tailwind 3+)

### React Version

- Requires React 18+ for `useId` hook
- For React 17, you'll need to polyfill or modify the components

### Form Submission

- Input and Select properly support `name` attribute for native form submission
- All standard HTML attributes are spread to the underlying elements

### Styling Limitations

- Error messages (`error` prop) are unstyled ReactNodes - you control the styling
- Icons (`leftIcon`, `rightIcon`) are unstyled ReactNodes - you control spacing/styling
- This is intentional for maximum flexibility

### Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- CSS Grid and Flexbox required
- CSS custom properties supported

---

## File Structure

```
src/
├── components/
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── button.types.ts
│   │   └── button.styles.ts
│   ├── Input/
│   │   ├── Input.tsx
│   │   ├── input.types.ts
│   │   └── input.styles.ts
│   ├── Select/
│   │   ├── Select.tsx
│   │   ├── select.types.ts
│   │   └── select.styles.ts
│   └── Spinner/
│       └── Spinner.tsx
├── common/
│   └── form.styles.ts (shared styles)
└── utils/
    ├── cn.ts (className utility)
    └── constants.ts
```

---

## Contributing

Contributions are welcome! Please ensure:

1. TypeScript types are properly defined
2. Components follow accessibility best practices
3. Tailwind classes are used consistently
4. Both controlled and uncontrolled patterns work
5. All props are documented

---

## License

MIT

---

## Examples

Check the `/examples` directory for more usage examples:

- Form validation
- Dynamic fields
- Custom themes
- Integration with form libraries

---

## Support

For issues and feature requests, please open an issue on GitHub.

---

**Built with ❤️ using React and Tailwind CSS**
