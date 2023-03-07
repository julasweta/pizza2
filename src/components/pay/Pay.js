import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { deleteAll } from "../../redux/slices/pizzasSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";

function Pay() {
  const dispatch = useDispatch();

  /* модальне вікно */
  const [isOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  //вивід тексту помилок при валідації форми
  const schema = yup.object().shape({
    firstName: yup.string().required("Введіть ваше імя"),
    lastName: yup.string().required("Please enter your last name"),
    email: yup
      .string()
      .email("Please enter a valid email address")
      .required("Please enter your email"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Please enter a password"),
  });

  const {
    register,
    label,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });


  const { items, totalCount, totalPrice, lang } = useSelector(
    (state) => state.pizzas
  );

  const onSubmit = (data) => {
    console.log(data);
    items.map((item) => console.log(item));
  };

  //видаляємо всі піци після надсилання замовлення, відкриваємо модальне вікно і скролимо сторінку до верху
  const clear = () => {
    dispatch(deleteAll());
    openModal();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="pay">
      <div className="notation">
       {lang? ' Ви вибрали до оплати' : 'You have selected to pay'}
        <span> {totalCount} </span>
        {lang? 'позиції на суму' : 'positions for the amount'} <span> {totalPrice} </span>
        грн.
        <div>{lang? 'Для завершення замовлення заповніть ваші дані' : 'Fill in your details to complete the order'}</div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Ваше Ім'я*</label>
        <input {...register("firstName")} />
        {errors.firstName && <span>{errors.firstName.message}</span>}

        <label>Ваше Прізвище</label>
        <input {...register("lastName")} />
        {errors.lastName && <span>{errors.lastName.message}</span>}

        <label>Ваш email</label>
        <input {...register("email")} />
        {errors.email && <span>{errors.email.message}</span>}

        <label>
          Введіть пароль для реєстрації вашого акаунта і перегляду статуса
          замовлення{" "}
        </label>
        <input {...register("password")} />
        {errors.password && <span>{errors.password.message}</span>}

        <label>Виберіть відділення *Нової Пошти*</label>
        <select placeholder="відділення" {...register("відділення")}>
          <option value="73">73 - відділення, м. Львів, Виговського, 51</option>
          <option value="52">52</option>
          <option value="23">23</option>
        </select>
        <button type="submit" className="submit" onClick={() => clear()}>
          Відправити
        </button>
      </form>

      {/* модальне вікно */}
      {isOpen && (
        <div className="modal-overlays" onClick={closeModal}>
          <div className="modal-mesage">
            <div className="modal-content">
              <span className="close" onClick={closeModal}>&times;</span>
              <p>Дякуємо за замовлення. Очікуйте на дзвінок</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Pay;
