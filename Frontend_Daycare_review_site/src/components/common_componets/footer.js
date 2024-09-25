import React from 'react';
import { Link } from 'react-router-dom';
import '../../scss/common/footer.scss';

const Footer = () => {
	const links =[
		{path: "/about", link_name:"保育ねっとについて"},
		{path: "/search", link_name:"保育施設を検索する"},
		{path: "/mypage", link_name:"マイページ"},
		{path: "/mypage", link_name:"コミュニティ"},
		{path: "/mypage", link_name:"子育て情報"},
		{path: "/mypage", link_name:"お問合せ"},
		{path: "/mypage", link_name:"利用規約"},
		{path: "/mypage", link_name:"運営会社"},
	];
	return (
		<>
			<footer className='footer'>
			
				<div className="container">
					<h1>
						<Link to="/" className='link'>保育ねっと</Link>
					</h1>
					<nav>
						<ul className='footer-links'>
							{links.map((link) => (
								<li key={link.link_name}>
									<Link to={link.path} className='link'>{link.link_name}</Link>
								</li>
							))}
						</ul>
					</nav>
					<div className='copyright'>
						<p>© 保育ねっと All Rights Reserved.</p>
					</div>
				</div>
			</footer>
		</>
		);
}

export default Footer;