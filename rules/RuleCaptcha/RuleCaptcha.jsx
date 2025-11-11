import React, { useRef, useEffect, useState } from 'react';
import Rule from "../Rule";
import ReloadButton from '../../components/ReloadButton';
import styles from './RuleCaptcha.module.css';

function generateText(length) {
    let result = '';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

function drawCaptcha(canvas, text) {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#f0f0f0';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < 7; i++) {
        ctx.strokeStyle = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
        ctx.beginPath();
        ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
        ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
        ctx.stroke();
    }

    ctx.font = 'bold 30px "Comic Sans MS", cursive, sans-serif';
    ctx.fillStyle = '#333';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);
}

function CaptchaDisplay({ captchaText, regenerate, correct }) {
    const canvasRef = useRef(null);
    const [reloadsLeft, setReloadsLeft] = useState(3);

    useEffect(() => {
        if (canvasRef.current) {
            drawCaptcha(canvasRef.current, captchaText);
            console.log("CAPTCHA text:", captchaText);
        }
    }, [captchaText]);

    const handleRegenerate = () => {
        if (reloadsLeft > 0) {
            regenerate();
            setReloadsLeft(reloadsLeft - 1);
        } 
    };

    return (
        <div className={styles.captcha_center_wrapper}>
            <div className={styles.captcha_inline}>
                <div className={styles.captcha_canvas_container}>
                    <canvas
                        ref={canvasRef}
                        width="200"
                        height="50"
                        className={styles.captcha_canvas}
                    />
                </div>
                <ReloadButton
                    onClick={handleRegenerate}
                    hidden={correct}
                    reloadsLeft={reloadsLeft}
		    showLastReload={true}
                />
            </div>
        </div>
    );
}

export default class RuleCaptcha extends Rule {
    constructor() {
        super("Your password must include this CAPTCHA:");

        this.captchaText = generateText(8);
	this.createRenderItem();
    }

    createRenderItem() {
        this.renderItem = ({ regenerateRule, correct, num }) => (
            <CaptchaDisplay
                captchaText={this.captchaText}
                regenerate={() => regenerateRule(num)}
                correct={correct}
            />
        );
    }

    regenerate() {
        this.captchaText = generateText(8);
        this.createRenderItem();
    }

    check(txt) {
        const result = txt.includes(this.captchaText);
        return result;
    }
}