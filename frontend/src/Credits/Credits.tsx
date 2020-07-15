import React from "react";

import {
  StyledCreditPage,
  StyledCredits,
  StyledCredit,
} from "./Credits.styled";

import studentGirl from "./../static/student_girl.png";
import studentBoy from "./../static/student_boy.png";
import teacherMan from "./../static/teacher_man.png";
import teacherWoman from "./../static/teacher_woman.png";
import clock from "./../static/clock.png";

const Credits = () => (
  <StyledCreditPage>
    <h1>Krediteringer</h1>
    <StyledCredits>
      <StyledCredit>
        <h3>Elev jente</h3>
        <img src={studentGirl} alt="Elev (jente) avatar" />
        <p>
          <a href="https://www.flaticon.com/authors/freepik" title="Freepik">
            Freepik
          </a>
          {" fra "}
          <a href="https://www.flaticon.com/" title="Flaticon">
            Flaticon
          </a>
        </p>
      </StyledCredit>
      <StyledCredit>
        <h3>Elev gutt</h3>
        <img src={studentBoy} alt="Elev (gutt) avatar" />
        <p>
          <a href="https://www.flaticon.com/authors/freepik" title="Freepik">
            Freepik
          </a>
          {" fra "}
          <a href="https://www.flaticon.com/" title="Flaticon">
            Flaticon
          </a>
        </p>
      </StyledCredit>
      <StyledCredit>
        <h3>Lærer mann</h3>
        <img src={teacherMan} alt="Lærer mann avatar" />
        <p>
          <a href="https://www.flaticon.com/authors/freepik" title="Freepik">
            Freepik
          </a>
          {" fra "}
          <a href="https://www.flaticon.com/" title="Flaticon">
            Flaticon
          </a>
        </p>
      </StyledCredit>
      <StyledCredit>
        <h3>Lærer dame</h3>
        <img src={teacherWoman} alt="Lører dame avatar" />
        <p>
          <a href="https://www.flaticon.com/authors/monkik" title="monkik">
            monkik
          </a>
          {" fra "}
          <a href="https://www.flaticon.com/" title="Flaticon">
            Flaticon
          </a>
        </p>
      </StyledCredit>
      <StyledCredit>
        <h3>Klokke</h3>
        <img src={clock} alt="Klokke" />
        <p>
          <a href="https://www.flaticon.com/authors/freepik" title="Freepik">
            Freepik
          </a>
          {" fra "}
          <a href="https://www.flaticon.com/" title="Flaticon">
            Flaticon
          </a>
        </p>
      </StyledCredit>
    </StyledCredits>
  </StyledCreditPage>
);

export default Credits;
