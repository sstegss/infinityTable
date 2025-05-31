import { useForm, type SubmitHandler } from "react-hook-form";
import type { TableItem } from "../../api/types";
import styles from "./Form.module.css";
import { addUser } from "../../api/items";
import {
  nameValidation,
  emailValidation,
  ageValidation,
  phoneValidation,
  telegramValidation,
  dateValidation,
  balanceValidation,
} from "./validations";
import { useSelector } from "react-redux";
import type { RootState } from "../../state/store";
import { useQueryClient } from "@tanstack/react-query";

type TableItemFromForm = Omit<TableItem, "id">;
export default function Form() {
  const submitted = useSelector((state: RootState) => state.submit.value);
  const queryClient = useQueryClient()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TableItemFromForm>({
    defaultValues: { phone: "+7" },
  });
  const submit: SubmitHandler<TableItemFromForm> = async (data) => {
    try {
      queryClient.invalidateQueries({queryKey: ['items']});
      await addUser(data);
    } catch (error) {
      console.error(error);
    }
    console.log(`submitted`, submitted);
  };

  return (
    <>
      <h2 className={styles.label}>Fill the form</h2>
      <form action="" onSubmit={handleSubmit(submit)}>
        <div className={styles.formField}>
          <label htmlFor="firstName">Your name*</label>
          <input
            type="text"
            {...register("firstName", {
              required: "First name is required",
              validate: nameValidation,
            })}
          />
        </div>
        {errors.firstName && (
          <div className={styles.error}>{errors.firstName.message}</div>
        )}
        <div className={styles.formField}>
          <label htmlFor="midName">Your middle name</label>
          <input
            type="text"
            {...register("midName", {
              validate: nameValidation,
            })}
          />
        </div>
        {errors.midName && (
          <div className={styles.error}>{errors.midName.message}</div>
        )}
        <div className={styles.formField}>
          <label htmlFor="lastName">Your lastname*</label>
          <input
            type="text"
            {...register("lastName", {
              required: "Last name is required",
              validate: nameValidation,
            })}
          />
        </div>
        {errors.lastName && (
          <div className={styles.error}>{errors.lastName.message}</div>
        )}
        <div className={styles.formField}>
          <label htmlFor="email">Your email*</label>
          <input
            type="text"
            {...register("email", {
              required: "Email is required",
              validate: emailValidation,
            })}
          />
        </div>
        {errors.email && (
          <div className={styles.error}>{errors.email.message}</div>
        )}
        <div className={styles.formField}>
          <label htmlFor="age">Your age*</label>
          <input
            type="number"
            {...register("age", {
              required: "Age is required",
              validate: ageValidation,
            })}
          />
        </div>
        {errors.age && <div className={styles.error}>{errors.age.message}</div>}
        <div className={styles.formField}>
          <label htmlFor="phone">Your phone*</label>
          <input
            type="text"
            {...register("phone", {
              required: true,
              validate: phoneValidation,
            })}
          />
        </div>
        {errors.phone && (
          <div className={styles.error}>{errors.phone.message}</div>
        )}
        <div className={styles.formField}>
          <label htmlFor="telegram">Your telegram</label>
          <input
            type="text"
            {...register("telegram", { validate: telegramValidation })}
          />
        </div>
        {errors.telegram && (
          <div className={styles.error}>{errors.telegram.message}</div>
        )}
        <div className={styles.formField}>
          <label htmlFor="city">Your city</label>
          <input type="text" {...register("city")} />
        </div>
        {errors.city && (
          <div className={styles.error}>{errors.city.message}</div>
        )}
        <div className={styles.formField}>
          <label htmlFor="registrationDate">Your registration date</label>
          <input
            type="date"
            {...register("registrationDate", { validate: dateValidation })}
          />
        </div>
        {errors.registrationDate && (
          <div className={styles.error}>{errors.registrationDate.message}</div>
        )}
        <div className={styles.formField}>
          <label htmlFor="notifications">Are you subscribed</label>
          <input type="checkbox" {...register("notifications")} />
        </div>
        {errors.notifications && (
          <div className={styles.error}>{errors.notifications.message}</div>
        )}
        <div className={styles.formField}>
          <label htmlFor="premiumMember">Are you premium subscribed</label>
          <input type="checkbox" {...register("premiumMember")} />
        </div>
        {errors.premiumMember && (
          <div className={styles.error}>{errors.premiumMember.message}</div>
        )}
        <div className={styles.formField}>
          <label htmlFor="balance">Your balance</label>
          <input
            type="number"
            {...register("balance", { validate: balanceValidation })}
          />
        </div>
        {errors.balance && (
          <div className={styles.error}>{errors.balance.message}</div>
        )}
        <div className={styles.formField}>
          <label htmlFor="universityEducation">University Education</label>
          <input type="checkbox" {...register("universityEducation")} />
        </div>
        {errors.universityEducation && (
          <div className={styles.error}>
            {errors.universityEducation.message}
          </div>
        )}
        <div className={styles.formField}>
          <label htmlFor="twoFactorEnabled">Two-factor authentication</label>
          <input type="checkbox" {...register("twoFactorEnabled")} />
        </div>
        {errors.twoFactorEnabled && (
          <div className={styles.error}>{errors.twoFactorEnabled.message}</div>
        )}
        <div className={styles.formField}>
          <button>submit</button>
          {submitted ? (
            <span className={styles.submitted}>submitted!</span>
          ) : (
            ""
          )}
        </div>
      </form>
    </>
  );
}
