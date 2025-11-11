'use client'

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useAutoAnimate } from '@formkit/auto-animate/react'
import Confetti from 'react-confetti'
import styles from './page.module.css'
import PasswordBox from "../components/PasswordBox";
import RuleBox from "../components/RuleBox";
import CongratsBox from "../components/CongratsBox";
import { createRules, sort_rules } from "../rules/rules";
import RuleRetypeNoPaste from "../rules/RuleRetypeNoPaste/RuleRetypeNoPaste";

async function get_todays_wordle() {
    const url = `/api/wordle`;
    const options = { method: 'GET' };

    try {
        let response = await fetch(url, options);
        if (!response.ok) {
            console.error("Error from /api/wordle:", await response.text());
            return "ERROR";
        }
        let json = await response.json();
        console.log("WORDLE: ", json);
        return json.solution;
    } catch (error) {
        console.error("Failed to fetch wordle:", error);
        return "ERROR";
    }
}

async function get_moon_phase() {
    try {
        const response = await fetch(`https://wttr.in/Moon?format=%m&t=${new Date().getTime()}`, {
            headers: {
            }
        });
        if (!response.ok) return null;

        const emoji = await response.text();
        console.log("Moon Phase:", emoji);
        return emoji;
    } catch (error) {
        console.error("Failed to fetch moon phase:", error);
        return null;
    }
}

export default function Home() {
    const [pswd, setPswd] = useState("");
    const [ruleState, setRuleState] = useState([]); 
    const [loading, setLoading] = useState(true);
    const max_unlocked_rules = useRef(0);
    const pswdBoxRef = useRef(null);
    const [aaParent, aaEnableAnimations] = useAutoAnimate();
    const [allSolved, setAllSolved] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);
    const justSolvedJumpRule = useRef(false);

    useEffect(() => {
        async function loadGameData() {
            const [wordleSolution, moonPhaseEmoji] = await Promise.all([
                get_todays_wordle(),
                get_moon_phase()
            ]);
            const ruleList = createRules(wordleSolution, moonPhaseEmoji);
            const initialRules = ruleList.map((rule, i) => {
                const newRule = Object.create(Object.getPrototypeOf(rule));
                Object.assign(newRule, rule);
                newRule.num = i + 1;
                newRule.correct = false;
                newRule.unlocked = false;
                return newRule;
            });
            max_unlocked_rules.current = 0;
            setRuleState(initialRules);
            setLoading(false);
    }
            loadGameData();
    }, []);

    useEffect(() => {
        if (loading === false && pswd.length > 0) {
            checkRules(pswd);
        }
    }, [loading]);

    function setPswdAndCheckRules(txt) {
    if (txt.length < pswd.length) {
            const retypeRule = ruleState.find(r => r instanceof RuleRetypeNoPaste);

            if (retypeRule && retypeRule.unlocked && !retypeRule.correct) {
                shakePasswordBox(true);
                setTimeout(() => shakePasswordBox(false), 500);
                return;
            }
        }
        setPswd(txt);
        checkRules(txt);
    }
     
function checkRules(txt) {
        if (ruleState.length === 0) return;

        if (justSolvedJumpRule.current) {
            if (aaParent.current) aaEnableAnimations(aaParent.current, true);
            justSolvedJumpRule.current = false;
        }

        let rules = [...ruleState];
        let solved_count = 0;
        let allPreviousRulesSolved = true; 

        for (let i = 0; i < rules.length; i++) {
            if (rules[i].unlocked === false && i === max_unlocked_rules.current && allPreviousRulesSolved) {
                rules[i].unlocked = true;
                max_unlocked_rules.current++;
            }

            if (rules[i].unlocked) {
                const freezeAnimations = () => {
                    if (aaParent.current) aaEnableAnimations(aaParent.current, false);
                    justSolvedJumpRule.current = true;
                };

                const propsToChild = { 
                    pswd: txt, 
                    setPswd: setPswdAndCheckRules, 
                    shakePasswordBox, 
                    regenerateRule, 
                    correct: rules[i].correct, 
                    freezeAnimations, 
                    num: rules[i].num
                };
                
                rules[i].correct = rules[i].check(txt, propsToChild);

                if (rules[i].correct) {
                    solved_count++;
                } else {
                    allPreviousRulesSolved = false;
                }
            }
        }

        setRuleState(rules);

        if (solved_count === rules.length && rules.length > 0) {
            if (aaParent.current) aaEnableAnimations(aaParent.current, false);
            setAllSolved(true);
            setShowConfetti(true);
        } else {
            setAllSolved(false);
        }
    }

    useEffect(() => {
        if (showConfetti) {
            const timer = setTimeout(() => {
                setShowConfetti(false);
            }, 25000);
            return () => clearTimeout(timer);
        }
    }, [showConfetti]);

    function shakePasswordBox(boolean) {
        if(boolean) {
            pswdBoxRef.current.classList.add("shake");
        }
        else{
            pswdBoxRef.current.classList.remove("shake");
        }
    }

    function regenerateRule(num) {
        console.log("regenerate", num);
        num--;
        let rules = [...ruleState];
        if("regenerate" in rules[num]) {
            rules[num].regenerate();
            setRuleState([...rules]);
        }
    }
    
    function handleHeaderClick() {
        window.location.reload();
    }

    return (
        <div className={styles.pageWrapper}>
        {showConfetti && (
            <Confetti
                numberOfPieces={1000}
                recycle={false}
                gravity={0.15}
                initialVelocityY={{ min: 1, max: 4 }}
                initialVelocityX={{ min: -2, max: 2 }}
                wind={0.01}
                confettiSource={{
                    x: 0,
                    y: 0,
                    w: typeof window !== 'undefined' ? window.innerWidth * 0.7 : 0,
                    h: typeof window !== 'undefined' ? window.innerHeight * 0.1 : 0
                }}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 9999
                }}
            />
        )}
        <div className={styles.container}>
            
            <div className={styles.title} onClick={handleHeaderClick}>
                <Image
                    src="/passyeti-logo.png"
                    width={75}
                    height={75}
                    alt=""
                />
                <div className={styles.title_text}>
                    PassYeti
                </div>
            </div>

        <div className={styles.subtitle} onClick={handleHeaderClick}></div>

            <PasswordBox pswd={pswd} setPswd={setPswdAndCheckRules} ref={pswdBoxRef}/>

       {allSolved && <CongratsBox
            heading={"Congratulations \u{1F3C6}\u{1F608}"} 
            msg={"You have successfully created a password \u{1F977}\u{2694}"}
        />} 

       {allSolved && (
        <button className={styles.playAgainButton} onClick={handleHeaderClick}>
            <span className={styles.playAgainIcon}></span>
               Play Again?
           </button>
       )}
            
            {max_unlocked_rules.current > 0 && (
           <div className={styles.levelCounter}>Level: {max_unlocked_rules.current}</div>
       )}

            <div ref={aaParent}>
                {ruleState.filter(r => r.unlocked).sort(sort_rules).map(r => {
                    return(
                        <RuleBox
                            key={r.num}
                            heading={`Rule ${r.num}`}
                            msg={r.msg}
                            correct={r.correct}
                            renderItem={r.renderItem}
                            propsToChild={{pswd, setPswd: setPswdAndCheckRules, shakePasswordBox, regenerateRule, correct: r.correct, num: r.num}}
                        />
                    )
                })}
            </div>
    </div>
        <footer className={styles.footer}>
            Check out the <a href="https://github.com/kraloveckey/passyeti" target="_blank">GitHub</a> repository for this project.<br/>
            This site is heavily inspired by&nbsp;
            <a href="https://neal.fun/password-game/" target="_blank">The Password Game</a> by Neal and the&nbsp;
            <a href="https://github.com/sayantanDs/quirkylock" target="_blank">QuirkyLock</a> project.
        </footer>
    </div>
    )
}