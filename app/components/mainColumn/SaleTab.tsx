import { TextField, Button, Typography } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Symbols, UserBoughtSymbol } from "@prisma/client";
import toast from "react-hot-toast";
import { useUpdateUserTradeAccount } from "@/app/features/reactQueryTradeAccount/useUpdateUserTradeAccount";
import { userTradeAccountType } from "@/app/features/reactQueryTradeAccount/useUserTradeAccount";

interface Props {
  currentSymbol: Symbols;
  currentBoughtSymbolCount: number;
  priceInputValue: number;
  volumeInputValue: number;
  todayDate: string;
  userCurrentBoughtSymbol: UserBoughtSymbol;
  setPriceInputValue: React.Dispatch<React.SetStateAction<number>>;
  setVolumeInputValue: React.Dispatch<React.SetStateAction<number>>;

  userTradeAccount: userTradeAccountType;
  handleSetUserBoughtSymbolCountToVulomeInput: any;
  handleClose: any;
}

const SaleTab = ({
  currentSymbol,
  currentBoughtSymbolCount,
  priceInputValue,
  volumeInputValue,
  todayDate,
  userCurrentBoughtSymbol,
  setPriceInputValue,
  setVolumeInputValue,
  userTradeAccount,
  handleClose,
  handleSetUserBoughtSymbolCountToVulomeInput,
}: Props) => {
  // calc the
  const finalOrderPrice = priceInputValue * volumeInputValue;

  //react-query // update
  const { mutate } = useUpdateUserTradeAccount();

  //
  const userCurrentProperty = userTradeAccount?.userProperty;
  //
  const handleFinalBuy = (userCurrentBoughtSymbol: UserBoughtSymbol) => {
    // this condition is for checking the renge of price that user entried
    if (
      priceInputValue > currentSymbol.lastPrice ||
      priceInputValue < currentSymbol.theLeast
    ) {
      toast.error("لطفا قیمت پیشنهادی خود را بین رنج قیمتی وارد کنید.");
      return null;
    }

    // this condition is for checking the renge of volume that user entried
    if (volumeInputValue > 100 || volumeInputValue < 10) {
      toast.error("لطفا حجم پیشنهادی خود را بین رنج حجمی وارد کنید.");
      return null;
    }

    // this condition is for when the user-property if not sufficent to buy the current symbol
    if (userCurrentProperty! < finalOrderPrice) {
      toast.error("موجودی حساب شما کافی نمی باشد.");
      return null;
    }

    // calc the user new property
    const userNewProperty = userCurrentProperty! - finalOrderPrice;

    // update the bought-symbol
    mutate({
      currentTradeAccountId: userTradeAccount?.id!,
      currentBoughtSymbol: userCurrentBoughtSymbol,
      newboughtSymbolName: currentSymbol.symbolName,
      newboughtSymbolCount: volumeInputValue,
      userNewProperty: userNewProperty,
    });

    // close the model
    handleClose();

    // set to 0
    setPriceInputValue(0);
    setVolumeInputValue(0);
  };

  return (
    <div className="flex-col justify-between">
      <div className="grid grid-cols-2 gap-2">
        {/* user property */}
        <TextField
          focused
          color="info"
          id="filled-read-only-input"
          label="مانده"
          value={userCurrentProperty}
          InputProps={{
            readOnly: true,
          }}
          variant="filled"
        />
        <TextField
          focused
          color="info"
          id="filled-read-only-input"
          label="دارایی سپرده گزاری"
          value={currentBoughtSymbolCount}
          onClick={(event: any) =>
            handleSetUserBoughtSymbolCountToVulomeInput(
              event,
              currentBoughtSymbolCount
            )
          }
          InputProps={{
            readOnly: true,
          }}
          variant="filled"
        />
        <TextField
          focused
          color="info"
          id="filled-read-only-input"
          label="اعتبار تا تاریخ:"
          defaultValue={todayDate}
          InputProps={{
            readOnly: true,
          }}
          variant="filled"
        />
      </div>
      <div className="flex items-center  mt-11">
        <TextField
          value={finalOrderPrice}
          color="warning"
          focused
          label="ارزش ناخالص سفارش"
          id="outlined-size-small"
          size="small"
          InputProps={{
            readOnly: true,
          }}
        />
        <Button
          sx={{
            width: { xs: "90px", md: "100px" },
            height: "41px",
            ml: "10px",
          }}
          size="large"
          variant="outlined"
          color="warning"
          startIcon={<ShoppingCartIcon className="text-green-600" />}
          onClick={() => handleFinalBuy(userCurrentBoughtSymbol)}
        >
          <Typography className="text-green-600">خرید</Typography>
        </Button>
      </div>
    </div>
  );
};

export default SaleTab;
