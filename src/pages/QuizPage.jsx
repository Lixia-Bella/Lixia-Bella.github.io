import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { destroyQuizTimers, initQuizPage } from '@/lib/quizCore.js';

export default function QuizPage() {
	const navigate = useNavigate();

	useEffect(() => {
		document.title = '知识问答挑战 - 阳光小站';
	}, []);

	useEffect(() => {
		initQuizPage();
		return () => {
			destroyQuizTimers();
		};
	}, []);

	return (
		<main className="main-content quiz-page">
			<div className="quiz-status-bar">
				<div className="status-item">
					<i className="fas fa-coins" />
					<span>
						我的积分：<strong id="totalPoints">0</strong>
					</span>
				</div>
				<div className="status-item">
					<i className="fas fa-fire" />
					<span>
						连胜：<strong id="winStreak">0</strong>
					</span>
				</div>
				<button
					type="button"
					className="status-item status-link"
					onClick={() => navigate('/rewards')}
				>
					<i className="fas fa-gift" />
					<span>兑换奖品</span>
				</button>
			</div>

			<section className="quiz-levels-section" id="levelsSection">
				<header className="page-header">
					<h1>
						<i className="fas fa-brain" /> 知识问答挑战
					</h1>
					<p className="author-info">选择关卡开始挑战，通关赢积分！</p>
				</header>

				<div className="levels-grid" id="levelsGrid" />
			</section>

			<section className="quiz-game-section" id="gameSection" style={{ display: 'none' }}>
				<div className="game-header">
					<div className="game-info">
						<span className="level-badge" id="currentLevelBadge">
							关卡 1
						</span>
						<span className="question-counter" id="questionCounter">
							1 / 5
						</span>
					</div>
					<div className="game-timer">
						<i className="fas fa-clock" />
						<span id="timerDisplay">30</span>
					</div>
					<button className="btn-quit" id="btnQuit" type="button" title="退出答题">
						<i className="fas fa-times" />
					</button>
				</div>

				<div className="progress-bar-container">
					<div className="progress-bar" id="progressBar" />
				</div>

				<div className="question-card" id="questionCard">
					<div className="question-category" id="questionCategory">
						<i className="fas fa-tag" /> <span>Node.js</span>
					</div>
					<h3 className="question-text" id="questionText">
						题目加载中...
					</h3>
					<div className="options-list" id="optionsList" />
				</div>

				<div className="answer-feedback" id="answerFeedback" style={{ display: 'none' }}>
					<div className="feedback-icon" id="feedbackIcon" />
					<p className="feedback-text" id="feedbackText" />
					<p className="feedback-explain" id="feedbackExplain" />
					<button className="btn-next" id="btnNext" type="button">
						下一题 <i className="fas fa-arrow-right" />
					</button>
				</div>
			</section>

			<section className="quiz-result-section" id="resultSection" style={{ display: 'none' }}>
				<div className="result-card">
					<div className="result-icon" id="resultIcon">
						<i className="fas fa-trophy" />
					</div>
					<h2 className="result-title" id="resultTitle">
						挑战完成！
					</h2>
					<div className="result-stats">
						<div className="result-stat">
							<span className="stat-label">正确率</span>
							<span className="stat-value" id="resultAccuracy">
								0%
							</span>
						</div>
						<div className="result-stat">
							<span className="stat-label">用时</span>
							<span className="stat-value" id="resultTime">
								0s
							</span>
						</div>
						<div className="result-stat">
							<span className="stat-label">获得积分</span>
							<span className="stat-value points" id="resultPoints">
								+0
							</span>
						</div>
					</div>
					<div className="result-detail" id="resultDetail" />
					<div className="result-actions">
						<button className="btn-retry" id="btnRetry" type="button">
							<i className="fas fa-redo" /> 再来一次
						</button>
						<button className="btn-back-levels" id="btnBackLevels" type="button">
							<i className="fas fa-th-large" /> 返回关卡
						</button>
						<Link to="/rewards" className="btn-go-rewards">
							<i className="fas fa-gift" /> 兑换奖品
						</Link>
					</div>
				</div>
			</section>
		</main>
	);
}
