import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import React, { useState, useEffect } from "react";
import RefreshIcon from "@material-ui/icons/Refresh";
import HelpIcon from "@material-ui/icons/Help";
import CopyContentIcon from "./utils/CopyContentIcon";
import Typography from "@material-ui/core/Typography";
import { IconButton, Tooltip, Snackbar } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  FacebookShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import {
  FacebookIcon,
  TelegramIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";

import comments from "./utils/comments.json";

const PATH = process.env.NODE_ENV === "development" ? "" : "/I-AM-A-PAP-IB";

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "center",
  },
  card: {
    margin: "100px 40px 100px 40px",
    maxWidth: "800px",
    borderRadius: "18px",
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
  },
  openQuote: {
    fontSize: 48,
    fontWeight: 600,
    userSelect: "none",
  },
  closeQuote: {
    fontSize: 48,
    fontWeight: 600,
    userSelect: "none",
    alignSelf: "flex-end",
  },
  actionsLeft: {
    display: "flex",
    flexWrap: "wrap",
    width: "90%",
  },
  shareButtons: {
    display: "flex",
    marginLeft: "12px !important",
    "& div": {
      marginRight: "8px",
      alignSelf: "center",
    },
  },
  actionsRight: {
    display: "flex",
    justifyContent: "flex-end",
    width: "10%",
  },
});

function getCommentIndex(currCommentIndex?: number): number {
  let nextCommentIndex: number = Math.floor(Math.random() * comments.length);

  while (nextCommentIndex === currCommentIndex) {
    nextCommentIndex = Math.floor(Math.random() * comments.length);
  }

  return nextCommentIndex;
}

function App() {
  const [index, setIndex] = useState(parseInt(window.location.hash.slice(1)));
  const isIndexValid = !isNaN(index) && index >= 0 && index < comments.length;

  const history = useHistory();
  if (!isIndexValid) {
    setIndex(getCommentIndex());
  }

  const classes = useStyles();

  const [isCopiedSnackbarShown, setIsCopiedSnackBarShown] = useState(false);

  useEffect(() => {
    history.push(PATH + "/#" + index);
  }, [index, history]);

  function copyToClipboard(str: string) {
    const el: HTMLTextAreaElement = document.createElement("textarea");
    el.value = str;
    el.setAttribute("readonly", "");
    el.style.position = "absolute";
    el.style.left = "-9999px";
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
  }

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <Typography className={classes.openQuote}>“</Typography>
          <Typography>{comments[index]}</Typography>
          <Typography className={classes.closeQuote}>”</Typography>
        </CardContent>
        <CardActions>
          <div className={classes.actionsLeft}>
            <Tooltip title="Generate comment" placement="top">
              <IconButton
                aria-label="generate comment"
                onClick={() => {
                  setIndex(getCommentIndex(index));
                }}
              >
                <RefreshIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title={"Copy to clipboard"} placement="top">
              <IconButton
                aria-label="copy comment"
                onClick={() => {
                  copyToClipboard(comments[index]);
                  setIsCopiedSnackBarShown(true);
                }}
              >
                <CopyContentIcon />
              </IconButton>
            </Tooltip>

            <div className={classes.shareButtons}>
              <Tooltip title="Share to Facebook" placement="top">
                <div>
                  <FacebookShareButton
                    url={"https://nelsontky.github.io/I-AM-A-PAP-IB/#" + index}
                    quote={comments[index]}
                  >
                    <FacebookIcon size={32} round />
                  </FacebookShareButton>
                </div>
              </Tooltip>
              <Tooltip title="Share to Telegram" placement="top">
                <div>
                  <TelegramShareButton
                    url={"https://nelsontky.github.io/I-AM-A-PAP-IB/#" + index}
                    title={comments[index]}
                  >
                    <TelegramIcon size={32} round />
                  </TelegramShareButton>
                </div>
              </Tooltip>
              <Tooltip title="Share to Twitter" placement="top">
                <div>
                  <TwitterShareButton
                    url={"https://nelsontky.github.io/I-AM-A-PAP-IB/#" + index}
                    title={comments[index]}
                  >
                    <TwitterIcon size={32} round />
                  </TwitterShareButton>
                </div>
              </Tooltip>
              <Tooltip title="Share to Whatsapp" placement="top">
                <div>
                  <WhatsappShareButton
                    url={"https://nelsontky.github.io/I-AM-A-PAP-IB/#" + index}
                    title={comments[index]}
                  >
                    <WhatsappIcon size={32} round />
                  </WhatsappShareButton>
                </div>
              </Tooltip>
            </div>
          </div>

          <div className={classes.actionsRight}>
            <Tooltip title="About this site" placement="top">
              <IconButton
                aria-label="about this site"
                target="_blank"
                href="https://github.com/nelsontky/I-AM-A-PAP-IB/blob/master/README.md"
                rel="noopener noreferrer"
              >
                <HelpIcon />
              </IconButton>
            </Tooltip>
          </div>
        </CardActions>
      </Card>

      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={isCopiedSnackbarShown}
        onClose={() => setIsCopiedSnackBarShown(false)}
        message="Comment copied to clipboard!"
        autoHideDuration={5000}
      />
    </div>
  );
}

export default App;
