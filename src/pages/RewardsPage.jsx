import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { initRewardsPage } from '@/lib/quizCore.js';

export default function RewardsPage() {
	const navigate = useNavigate();

	useEffect(() => {
		document.title = '奖励池 - 阳光小站';
	}, []);

	useEffect(() => {
		initRewardsPage();
	}, []);

	return (
		<main className="main-content rewards-page">
			<div className="quiz-status-bar">
				<div className="status-item">
					<i className="fas fa-coins" />
					<span>
						我的积分：<strong id="totalPoints">0</strong>
					</span>
				</div>
				<div className="status-item">
					<i className="fas fa-exchange-alt" />
					<span>
						已兑换：<strong id="exchangedCount">0</strong> 次
					</span>
				</div>
				<button
					type="button"
					className="status-item status-link"
					onClick={() => navigate('/quiz')}
				>
					<i className="fas fa-gamepad" />
					<span>去答题</span>
				</button>
			</div>

			<header className="page-header">
				<h1>
					<i className="fas fa-gift" /> 奖励池
				</h1>
				<p className="author-info">
					<i className="fas fa-clock" /> 本周兑换周期：
					<strong id="weekRange" />
					<span className="divider">|</span>
					<i className="fas fa-sync-alt" /> 每周刷新奖品
				</p>
			</header>

			<section className="rewards-rules-section">
				<h2>
					<i className="fas fa-info-circle" /> 兑换规则
				</h2>
				<div className="rules-grid">
					<div className="rule-card">
						<div className="rule-icon">
							<i className="fas fa-coins" />
						</div>
						<h4>积分获取</h4>
						<p>通过知识问答闯关获得积分，答对越多积分越高</p>
					</div>
					<div className="rule-card">
						<div className="rule-icon">
							<i className="fas fa-calendar-week" />
						</div>
						<h4>兑换周期</h4>
						<p>每周一刷新奖品，兑换周期为一周</p>
					</div>
					<div className="rule-card">
						<div className="rule-icon">
							<i className="fas fa-cubes" />
						</div>
						<h4>奖品数量</h4>
						<p>每周 10 种奖品，每种限量 3 个，先到先得</p>
					</div>
					<div className="rule-card">
						<div className="rule-icon">
							<i className="fas fa-check-circle" />
						</div>
						<h4>兑换条件</h4>
						<p>积分达到奖品所需积分即可兑换</p>
					</div>
				</div>
			</section>

			<section className="rewards-list-section">
				<h2>
					<i className="fas fa-store" /> 本周奖品
				</h2>
				<div className="rewards-grid" id="rewardsGrid" />
			</section>

			<section className="exchange-history-section">
				<h2>
					<i className="fas fa-history" /> 兑换记录
				</h2>
				<div className="history-list" id="historyList">
					<div className="empty-history" id="emptyHistory">
						<i className="fas fa-inbox" />
						<p>暂无兑换记录，快去答题赚积分吧！</p>
						<Link to="/quiz" className="btn-go-quiz">
							<i className="fas fa-gamepad" /> 开始答题
						</Link>
					</div>
				</div>
			</section>

			<div className="modal-overlay" id="exchangeModal" style={{ display: 'none' }}>
				<div className="modal-card">
					<div className="modal-header">
						<h3>
							<i className="fas fa-exchange-alt" /> 确认兑换
						</h3>
						<button className="modal-close" id="modalClose" type="button">
							<i className="fas fa-times" />
						</button>
					</div>
					<div className="modal-body" id="modalBody" />
					<div className="modal-footer">
						<button className="btn-modal-cancel" id="modalCancel" type="button">
							取消
						</button>
						<button className="btn-modal-confirm" id="modalConfirm" type="button">
							确认兑换
						</button>
					</div>
				</div>
			</div>
		</main>
	);
}
