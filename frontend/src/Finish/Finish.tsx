import React from "react";
import { useParams, useHistory } from "react-router-dom";

import { StyledFinish } from "./Finish.styled";

import { removeConversation, getRecordedConversation } from "./../helpers";
import { UrlParams, Questions, Question, Answers, Answer } from "./../types";

import clock from "./../static/clock.png";

import {
  PDFDownloadLink,
  Document,
  Page,
  View,
  Text,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

Font.register({
  family: "opensans",
  src:
    "https://fonts.gstatic.com/s/opensans/v17/mem8YaGs126MiZpBA-UFVZ0ef8pkAg.ttf",
});

Font.register({
  family: "gloriahallelujah",
  src:
    "https://fonts.gstatic.com/s/gloriahallelujah/v11/LYjYdHv3kUk9BMV96EIswT9DIbW-MIS11zamvVCE.ttf",
});

const styles = StyleSheet.create({
  page: {
    padding: 20,
    border: "2 dotted black",
    fontFamily: "opensans",
  },
  section: {
    textAlign: "left",
    margin: 15,
  },
  question: { fontSize: 14, marginBottom: 3 },
  answer: { fontSize: 12 },
  notes: {
    height: "91%",
    margin: "5%",
    border: "2 dotted black",
    fontFamily: "opensans",
  },
  header: {
    margin: 20,
    fontFamily: "opensans",
    fontSize: 20,
    textAlign: "center",
  },
  introPage: {
    height: "100%",
  },
  conversatioName: {
    fontFamily: "gloriahallelujah",
    textAlign: "center",
    fontSize: 35,
    margin: "5%",
    marginTop: "20%",
  },
  conversationDescription: {
    fontFamily: "opensans",
    textAlign: "center",
    fontSize: 17,
    margin: "10%",
  },
  conversationDate: {
    fontFamily: "opensans",
    fontSize: 15,
    textAlign: "center",
    bottom: "10%",
    position: "absolute",
  },
});

type PDFProps = {
  name: string;
  description: string;
  questions: Questions;
  dialog: string[];
  answers: Answers;
};

type FinishProps = {
  name: string;
  description: string;
  questions: Questions;
  answers: Answers;
};

const getDate = () => {
  const now = new Date();
  return now.getDate() + "-" + (now.getMonth() + 1) + "-" + now.getFullYear();
};

const PDFDocument = ({
  name,
  description,
  questions,
  dialog,
  answers,
}: PDFProps) => (
  <Document>
    <Page size="A4" style={styles.introPage}>
      <Text style={styles.conversatioName}>{name}</Text>
      <Text style={styles.conversationDescription}>{description}</Text>
      <Text style={styles.conversationDate}>Dato: {getDate()}</Text>
    </Page>

    <Page size="A4" style={styles.page}>
      {dialog.map((q, i) => {
        const question: Question = questions[q];
        const answer: Answer = answers[questions[q].selectedAnswer];

        return (
          <View key={i} style={styles.section}>
            <Text style={styles.question}>
              {i < dialog.length - 1 ? `Lærer ${i + 1}: ` : `Avslutning: `}
              {question.label}
            </Text>
            {answer && i < dialog.length - 1 && (
              <Text style={styles.answer}>
                Elev: {answer ? answer.label : ""}
              </Text>
            )}
          </View>
        );
      })}
    </Page>
    <Page size="A4">
      <View style={styles.notes}>
        <Text style={styles.header}>Notater:</Text>
      </View>
    </Page>
  </Document>
);

const Finish = ({ name, description, questions, answers }: FinishProps) => {
  const history = useHistory();
  const { uuid } = useParams<UrlParams>();

  return (
    <StyledFinish>
      <h1>Friminutt!</h1>
      <h2>Samtalen er nå ferdig</h2>
      <div>
        <button
          onClick={() => {
            removeConversation(uuid);
            history.push("/conversation/" + uuid + "/start");
          }}
        >
          Start samtalen på ny
        </button>

        <PDFDownloadLink
          className="download"
          document={
            <PDFDocument
              name={name}
              description={description}
              questions={questions}
              dialog={getRecordedConversation(uuid)}
              answers={answers}
            />
          }
          fileName={"test.pdf"}
        >
          {({ loading }: { loading: boolean }) =>
            loading ? "Loading document..." : "Last ned samtale"
          }
        </PDFDownloadLink>
      </div>

      <img src={clock} alt="Clock icon"></img>
    </StyledFinish>
  );
};

export default Finish;
