import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import React, { useState } from "react";
import RefreshIcon from "@material-ui/icons/Refresh";
import CopyContentIcon from "./utils/CopyContentIcon";
import Typography from "@material-ui/core/Typography";
import { IconButton, Tooltip, Snackbar } from "@material-ui/core";
import { Route, useParams, Redirect, useLocation } from "react-router-dom";
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
  actions: {
    display: "flex",
    flexWrap: "wrap",
  },
  firstShareButton: {
    marginLeft: "12px",
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
  const path: number = parseInt(useLocation().pathname.slice(1));

  // if path is not set or invalid, get random index, else, use given path
  const [id, setId] = useState(
    isNaN(path) || path < 0 || path >= comments.length
      ? getCommentIndex()
      : path
  );

  return (
    <>
      <Redirect to={`/${id}`} />
      <Route path="/:id" children={<CommentCard setId={setId} />} />
    </>
  );
}

export interface CommentCardProps {
  setId(id: number): void;
}

function CommentCard({ setId }: CommentCardProps) {
  const classes = useStyles();

  const { id }: { id: string } = useParams();
  const index: number = parseInt(id);

  const [isCopiedSnackbarShown, setIsCopiedSnackBarShown] = useState(false);

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
        <CardActions className={classes.actions}>
          <Tooltip title="Generate comment" placement="top">
            <IconButton
              aria-label="generate comment"
              onClick={() => {
                setId(getCommentIndex(index));
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

          <Tooltip title="Share to Facebook" placement="top">
            <div>
              <FacebookShareButton
                url={window.location.href}
                quote={comments[index]}
              >
                <FacebookIcon
                  className={classes.firstShareButton}
                  size={32}
                  round
                />
              </FacebookShareButton>
            </div>
          </Tooltip>
          <Tooltip title="Share to Telegram" placement="top">
            <div>
              <TelegramShareButton
                url={window.location.href}
                title={comments[index]}
              >
                <TelegramIcon size={32} round />
              </TelegramShareButton>
            </div>
          </Tooltip>
          <Tooltip title="Share to Twitter" placement="top">
            <div>
              <TwitterShareButton
                url={window.location.href}
                title={comments[index]}
              >
                <TwitterIcon size={32} round />
              </TwitterShareButton>
            </div>
          </Tooltip>
          <Tooltip title="Share to Whatsapp" placement="top">
            <div>
              <WhatsappShareButton
                url={window.location.href}
                title={comments[index]}
              >
                <WhatsappIcon size={32} round />
              </WhatsappShareButton>
            </div>
          </Tooltip>
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
