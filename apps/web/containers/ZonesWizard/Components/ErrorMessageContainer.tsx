import ErrorMessages from "../../../components/ErrorMessages/ErrorMessages";

interface IProps {
  errorMessages?: string[];
}

export const ErrorMessageContainer = ({ errorMessages = [] }: IProps) =>
  errorMessages.length ? (
    <div className="flex mt-8 w-5/6 min-w-[100%] text-xs text-center justify-center">
      <ErrorMessages errors={errorMessages} />
    </div>
  ) : null;
