import css from './ErrorMessage.module.css';

export default function ErrorMessage() {
  return (
    <div className={css.error}>
      <p>Помилка при завантаженні фільмів. Спробуйте ще раз.</p>
    </div>
  );
}