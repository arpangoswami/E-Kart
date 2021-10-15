import React from "react";
//import { Skeleton } from "antd";
import { Card, makeStyles, CardHeader, CardContent } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
const useStyles = makeStyles((theme) => ({
  cardClass: {
    width: 300,
    height: 540,
    alignContent: "center",
    flexDirection: "column",
    margin: theme.spacing(5),
  },
  mediaClass: {
    width: "100%",
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));
const LoadingCard = ({ quantity }) => {
  const classes = useStyles();
  // const card = () => {
  //   let totalCards = [];
  //   for (let i = 0; i < quantity; i++) {
  //     totalCards.push(
  //       <Card className={classes.cardClass}>
  //         <Skeleton className="p-4" active></Skeleton>
  //       </Card>
  //     );
  //   }
  //   return totalCards;
  // };
  const card = () => {
    let totalCards = [];
    for (let i = 0; i < quantity; i++) {
      totalCards.push(
        <Card className={classes.cardClass}>
          <CardHeader
            avatar={
              <Skeleton
                animation="wave"
                variant="circle"
                width={40}
                height={40}
              />
            }
            title={
              <Skeleton
                animation="wave"
                height={10}
                width="80%"
                style={{ marginBottom: 6 }}
              />
            }
          />
          <Skeleton
            animation="wave"
            variant="rect"
            className={classes.mediaClass}
          />
          <CardContent>
            <React.Fragment>
              <Skeleton
                animation="wave"
                height={300}
                style={{ marginBottom: 6 }}
              />
              <Skeleton animation="wave" height={120} width="80%" />
            </React.Fragment>
          </CardContent>
        </Card>
      );
    }
    return totalCards;
  };
  return <div className="row pb-5">{card()}</div>;
};
export default LoadingCard;
