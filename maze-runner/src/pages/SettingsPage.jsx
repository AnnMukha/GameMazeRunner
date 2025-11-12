import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useGameSettings } from "../hooks/GameSettingsContext";

const SettingsSchema = Yup.object().shape({
  level: Yup.string().required("Оберіть рівень складності"),
  size: Yup.number()
    .min(3, "Мінімальний розмір — 3")
    .max(9, "Максимальний розмір — 9")
    .required("Вкажіть розмір поля"),
  speed: Yup.number()
    .min(1, "Мінімальна швидкість — 1")
    .max(5, "Максимальна швидкість — 5")
    .required("Вкажіть швидкість"),
});

export default function SettingsPage({ onStart }) {
  const { updateSettings } = useGameSettings();

  return (
    <div className="settings-container">
      <h1>⚙️ Налаштування гри</h1>

      <Formik
        initialValues={{ level: "easy", size: 5, speed: 1 }}
        validationSchema={SettingsSchema}
        onSubmit={(values) => {
          updateSettings(values);
          onStart();
        }}
      >
        {() => (
          <Form className="settings-form">
            <div className="form-group">
              <label htmlFor="level">Рівень складності:</label>
              <Field as="select" name="level" id="level">
                <option value="easy">Легкий</option>
                <option value="medium">Середній</option>
                <option value="hard">Складний</option>
              </Field>
              <ErrorMessage
                name="level"
                component="div"
                className="error-message"
              />
            </div>

            <div className="form-group">
              <label htmlFor="size">Розмір сітки:</label>
              <Field type="number" name="size" id="size" />
              <ErrorMessage
                name="size"
                component="div"
                className="error-message"
              />
            </div>

            <div className="form-group">
              <label htmlFor="speed">Швидкість:</label>
              <Field type="number" name="speed" id="speed" />
              <ErrorMessage
                name="speed"
                component="div"
                className="error-message"
              />
            </div>

            <button type="submit" className="start-button">
              🎮 Start Game
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
