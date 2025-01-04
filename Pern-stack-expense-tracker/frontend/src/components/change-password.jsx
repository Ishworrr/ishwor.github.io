import React from "react";
import { useForm } from "react-hook-form";
import { BiLoader } from "react-icons/bi";
import { toast } from "sonner";

export const changePassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();
  const [loading, setLoading] = useState(false);

  const submitPasswordHandler = async (data) => {
    console.log(data);

    try {
      setLoading(true);
      const { data: res } = await api.put(`/user/change-password`, data);
      if (res?.status === "success") {
        toast.success(res?.message);
      }
    } catch (error) {
      console.error("Something went wrong", error);
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="py-20">
      <form onSubmit={handleSubmit(submitPasswordHandler)}>
        <div className="">
          <p className="text-xl mb-1 dark:text-white text-black font-bold">
            Change Password
          </p>
          <span className="labelStyles">
            Enter your current password, new password and confirm new password
          </span>

          <div className="mt-6">
            <Input
              disabled={loading}
              name="currentPassword"
              className="inputStyle"
              type="password"
              placeholder="Current Password"
              {...register("currentPassword")}
              //   register={register("currentPassword", {
              //     required: "Current Password is required",
              //   })}
              label="Current password"
              error={
                errors.currentPassword ? errors.currentPassword.message : ""
              }
            />
            <Input
              disabled={loading}
              name="newPassword"
              className="inputStyle"
              type="password"
              placeholder="new Password"
              {...register("newPassword")}
              //   register={register("newPassword", {
              //     required: "New Password is required",
              //   })}
              label="New password"
              error={errors.newPassword ? errors.newPassword.message : ""}
            />

            <Input
              disabled={loading}
              name="confirmPassword"
              type="password"
              className="inputStyle"
              placeholder="Confirm Password"
              {...register("confirmPassword", {
                required: "Confirm Password is required!",
                validate: (val) => {
                  const { newPassword } = getValues();
                  return newPassword === val || "Password does not match";
                },
              })}
              label="Confirm password"
              error={
                errors.confirmPassword ? errors.confirmPassword.message : ""
              }
            />
          </div>
        </div>
        <div className="flex items-center gap-6 justify-end pb-10 border-b-2 border-gray-200 dark:border-gray-800">
          <Button
            variant="outline"
            loading={loading}
            type="reset"
            className="px-6 bg-transparent text-black darl:text-white border border-gray-200 dark:border-gray-700"
          >
            Reset
          </Button>
          <Button
            loading={loading}
            type="submit"
            className="px-8 bg-violet text-white "
          >
            {loading ? (
              <BiLoader className="animate-spin text-white" />
            ) : (
              "Chnage Password"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default changePassword;
