import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import NavBar from "../components/NavBar";

export const getServerSideProps = async () => {
  const res = await fetch("https://api.zoom.us/v2/users/me/meetings", {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOm51bGwsImlzcyI6Ijc2Y2VtVC1FUWEtSDdHSm01SkdFVWciLCJleHAiOjE2Mjc4NDQ0MDAsImlhdCI6MTYyNTUzNjQ2MH0.nHpNYt8wRcAmPxHLVgDyNYVcnWOYkQLMQs1As7YNU9o`,
    },
  });
  const data = await res.json();
  return {
    props: {
      meetings: data.meetings,
    },
  };
};

// export const getServerSideProps = async () => {
//   const res = await fetch("https://api.zoom.us/v2/users/me/meetings", {
//     headers: {
//       Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOm51bGwsImlzcyI6Ijc2Y2VtVC1FUWEtSDdHSm01SkdFVWciLCJleHAiOjE2Mjc4NDQ0MDAsImlhdCI6MTYyNTUzNjQ2MH0.nHpNYt8wRcAmPxHLVgDyNYVcnWOYkQLMQs1As7YNU9o`,
//     },
//   });
//   const data = await res.json();
//   return {
//     props: {
//       newMeeting: data,
//     },
//   };
// };

export default function Home({ meetings, newMeeting }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [meetingDetails, setMeetingDetails] = useState({
    topic: "",
    start_time: "",
    duration: "",
  });

  const handleChange = (e) => {
    setMeetingDetails({ ...meetingDetails, [e.target.name]: e.target.value });
    console.log(meetingDetails);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("https://api.zoom.us/v2/users/me/meetings", {
      body: JSON.stringify({
        name: e.target.name.value,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOm51bGwsImlzcyI6Ijc2Y2VtVC1FUWEtSDdHSm01SkdFVWciLCJleHAiOjE2Mjc4NDQ0MDAsImlhdCI6MTYyNTUzNjQ2MH0.nHpNYt8wRcAmPxHLVgDyNYVcnWOYkQLMQs1As7YNU9o`,
      },
      method: "POST",
    });
    const result = await res.json();
    console.log(result);
  };

  return (
    <>
      <Head>
        <title>Synthesis Portal</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/synthesis-logo.svg" />
      </Head>
      <NavBar />
      <section className={styles.main}>
        <div className={styles.meetingList}>
          <div className={styles.header}>
            <h1>Classes for cohort: Syn5</h1>
            {/* Syn5 is a hypothetical cohort name :) */}
            <button
              className={styles.startMeetingBtn}
              onClick={() => {
                setIsModalOpen(true);
              }}
            >
              Create meeting
            </button>
          </div>

          {meetings.map((meeting) => (
            <div className={styles.classes} key={meeting.id}>
              <h2 className={styles.meetingTopic}>{meeting.topic}</h2>
              <div className={styles.meetingDetails}>
                <div className={styles.meetingTime}>
                  <h3 className={styles.title}>{meeting.duration} minutes</h3>
                </div>
                <div className={styles.meetingDate}>
                  <h3 className={styles.title}>
                    {meeting.start_time.slice(
                      0,
                      meeting.start_time.search("T")
                    )}
                  </h3>
                </div>
              </div>
              <Link href={meeting.join_url}>
                <a rel="noopener noreferrer" target="_blank">
                  <button className={styles.joinBtn}>Join!</button>
                </a>
              </Link>
            </div>
          ))}
        </div>
        {isModalOpen && (
          <div className={styles.modal}>
            <form className={styles.formContainer} onSubmit={handleSubmit}>
              <h1 className={styles.formHeader}>Please Tell Us More...</h1>

              <label className={styles.inputLabel}>
                Topics
                <input
                  className={styles.formInput}
                  type="text"
                  placeholder="Ex: Build a tic tac toe game!"
                  onChange={handleChange}
                  // value={meetingDetails.topic}
                  name="topic"
                  autoComplete="topic"
                />
              </label>

              <label className={styles.inputLabel}>
                Start Time
                <input
                  className={styles.formInput}
                  type="text"
                  placeholder="Ex: 2021-07-0"
                  onChange={handleChange}
                  // value={meetingDetails.start_time}
                  name="start_time"
                  autoComplete="start_time"
                />
              </label>

              <label className={styles.inputLabel}>
                Duration (minutes)
                <input
                  className={styles.formInput}
                  type="number"
                  placeholder="Ex: 45"
                  onChange={handleChange}
                  // value={meetingDetails.duration}
                  name="duration"
                  autoComplete="duration"
                />
              </label>
              <div className={styles.createMeetingBtnContainer}>
                <button className={styles.createMeetingBtn}>Create</button>
              </div>
              <p
                className={styles.closeP}
                onClick={() => {
                  setIsModalOpen(false);
                }}
              >
                Close X
              </p>
            </form>
          </div>
        )}
      </section>
    </>
  );
}

// could've implemented e.preventDefault for more smooth experience (no page refresh)
// the tradeoff is that the new meeting wont automatically render in the meeting list when new meeting is created since I am using getServerSideProps()
// the other option I could've take would be to use getStaticProps(), implement e.preventDefault and
// use unstable_revalidate: for example 1 second that way we have the smooth experience of no page refresh and automatic new meeting added to the meeting list
