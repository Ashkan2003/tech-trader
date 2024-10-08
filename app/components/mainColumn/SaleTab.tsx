import { TextField, Button, Typography } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Symbols, UserBoughtSymbol, WatchList } from "@prisma/client";
import toast from "react-hot-toast";
import { userTradeAccountType } from "@/app/features/reactQueryTradeAccount/useUserTradeAccount";
import { useSaleSymbol } from "@/app/features/reactQueryTradeAccount/useSaleSymbol";
import { useUpdateWatchList } from "@/app/features/reactQueryWatchList/useUpdateWatchList";
import { useUserWatchLists } from "@/app/features/reactQueryWatchList/useUserWatchLists";

interface Props {
  currentSymbol: Symbols;
  userProperyWatchList: WatchList;
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
  userProperyWatchList,
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

  //react-query// delete or update
  const { mutate } = useSaleSymbol();

  //
  const { updateWatchListMutate } = useUpdateWatchList();

  // get the userProperty from userTradeAccount
  const userCurrentProperty = userTradeAccount?.userProperty;

  // calc the user new property // add the finalOrderPrice to userCurrentProperty
  const userNewProperty = userCurrentProperty! + finalOrderPrice;

  //when the user clicks on the sale btn run this...
  const handleFinalBuy = (userCurrentBoughtSymbol: UserBoughtSymbol) => {
    // if the state was notAllowed so dont let the user buy or sale it
    if (currentSymbol.state == "NOTALLOWED") {
      toast.error("وضعیت نماد درحالت ممنوع معامله قرار دارد.");
      return null;
    }

    // we want to prevent the user from saling the symbols that he dont have any count of it// so if the userCurrentBoughtSymbol was null render nothing
    if (!userCurrentBoughtSymbol) {
      toast.error("شما در این نماد دارایی ندارید");
      return null;
    }

    // the user canot sale more that its bought-symbol-count
    if (volumeInputValue > userCurrentBoughtSymbol?.count) {
      toast.error("شما نمی توانید بیشتر از دارایی خود حجم به فروش برسانید");
      return null;
    }

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

    // update the bought-symbol
    mutate(
      {
        userNewProperty: userNewProperty,
        symbolSaleCount: volumeInputValue,
        saledSymbolName: currentSymbol.symbolName,
        currentTradeAccountId: userTradeAccount?.id!,
        currentSaledSymbol: userCurrentBoughtSymbol,
      },
      {
        onSuccess: () => {
          // when the update-mutate of the saling a symbol was successfull update the watch
          // only update the user-watch, when the user watch to sale of of his property(symbol-count)
          if (volumeInputValue == userCurrentBoughtSymbol.count) {
            updateWatchListMutate({
              id: userProperyWatchList.id,
              title: "دارایی های من",
              // for deleting the current symbol from the userPropertyWatchLIst, replace the currentSymbol-name with ""
              symbols: userProperyWatchList.symbols.replaceAll(
                currentSymbol.symbolName,
                ""
              ),
            });
          }
        },
      }
    );

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
          color="error"
          startIcon={<ShoppingCartIcon className="text-red-600" />}
          onClick={() => handleFinalBuy(userCurrentBoughtSymbol)}
        >
          <Typography className="text-red-600">فروش</Typography>
        </Button>
      </div>
    </div>
  );
};

export default SaleTab;
