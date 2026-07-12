'use client';
import React from 'react';
import type { ComponentProps, ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { MailIcon } from 'lucide-react';
import { scrollToSection } from '@/lib/scroll';

function InstagramIcon({ className }: { className?: string }) {
	return (
		<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
			<rect x="3" y="3" width="18" height="18" rx="5" />
			<circle cx="12" cy="12" r="4" />
			<circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
		</svg>
	);
}

function FacebookIcon({ className }: { className?: string }) {
	return (
		<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
			<path d="M14 9h3V6h-3c-1.66 0-3 1.34-3 3v2H9v3h2v6h3v-6h3l1-3h-4V9c0-.55.45-1 1-1z" />
		</svg>
	);
}

function LinkedinIcon({ className }: { className?: string }) {
	return (
		<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
			<path d="M6.5 8.5v9M6.5 5.5v.01M11.5 17.5v-5.5c0-1.66 1.34-3 3-3s3 1.34 3 3v5.5M11.5 17.5v-6" />
		</svg>
	);
}

interface FooterLink {
	title: string;
	href: string;
	icon?: React.ComponentType<{ className?: string }>;
	external?: boolean;
}

interface FooterSection {
	label: string;
	links: FooterLink[];
}

const footerLinks: FooterSection[] = [
	{
		label: 'Studio',
		links: [
			{ title: 'Služby', href: '#sluzby' },
			{ title: 'Ceník', href: '#cenik' },
			{ title: 'Reference', href: '#reference' },
			{ title: 'Kontakt', href: '#kontakt' },
			{ title: 'Ochrana osobních údajů', href: '/ochrana-osobnich-udaju', external: true },
		],
	},
	{
		label: 'Tým',
		links: [
			{ title: 'Marek Pokorný', href: 'mailto:marek@studiodva.cz', icon: MailIcon, external: true },
			{ title: 'Matěj Vrážel', href: 'mailto:matej@studiodva.cz', icon: MailIcon, external: true },
		],
	},
	{
		label: 'Sledujte nás',
		links: [
			{ title: 'Instagram', href: '#', icon: InstagramIcon, external: true },
			{ title: 'Facebook', href: '#', icon: FacebookIcon, external: true },
			{ title: 'LinkedIn', href: '#', icon: LinkedinIcon, external: true },
		],
	},
];

export function Footer() {
	return (
		<footer className="md:rounded-t-6xl relative w-full max-w-6xl mx-auto flex flex-col items-center justify-center rounded-t-4xl border-t border-white/10 bg-[radial-gradient(35%_128px_at_50%_0%,theme(backgroundColor.white/8%),transparent)] px-6 py-12 lg:py-16">
			<div className="bg-white/20 absolute top-0 right-1/2 left-1/2 h-px w-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full blur" />

			<div className="grid w-full gap-10 xl:grid-cols-3 xl:gap-8">
				<AnimatedContainer className="space-y-4">
					<span className="block text-sm font-bold tracking-widest uppercase text-white">
						DVA
					</span>
					<p className="text-white/40 text-sm leading-relaxed">
						{`© ${new Date().getFullYear()} Studio Dva. Marek Pokorný & Matěj Vrážel.`}
					</p>
				</AnimatedContainer>

				<div className="mt-10 grid grid-cols-2 gap-8 md:grid-cols-3 xl:col-span-2 xl:mt-0">
					{footerLinks.map((section, index) => (
						<AnimatedContainer key={section.label} delay={0.1 + index * 0.1}>
							<div className="mb-10 md:mb-0">
								<h3 className="text-xs uppercase tracking-widest text-white/50 font-mono">{section.label}</h3>
								<ul className="text-white/60 mt-4 space-y-2 text-sm">
									{section.links.map((link) => (
										<li key={link.title}>
											{link.external ? (
												<a
													href={link.href}
													className="hover:text-white inline-flex items-center transition-all duration-300"
												>
													{link.icon && <link.icon className="me-1.5 size-4" />}
													{link.title}
												</a>
											) : (
												<a
													href={link.href}
													onClick={(e) => {
														e.preventDefault();
														scrollToSection(link.href.replace('#', ''));
													}}
													className="hover:text-white inline-flex items-center transition-all duration-300"
												>
													{link.icon && <link.icon className="me-1.5 size-4" />}
													{link.title}
												</a>
											)}
										</li>
									))}
								</ul>
							</div>
						</AnimatedContainer>
					))}
				</div>
			</div>
		</footer>
	);
}

type ViewAnimationProps = {
	delay?: number;
	className?: ComponentProps<typeof motion.div>['className'];
	children: ReactNode;
};

function AnimatedContainer({ className, delay = 0.1, children }: ViewAnimationProps) {
	const shouldReduceMotion = useReducedMotion();

	if (shouldReduceMotion) {
		return <div className={className}>{children}</div>;
	}

	return (
		<motion.div
			initial={{ filter: 'blur(4px)', translateY: -8, opacity: 0 }}
			whileInView={{ filter: 'blur(0px)', translateY: 0, opacity: 1 }}
			viewport={{ once: true }}
			transition={{ delay, duration: 0.8 }}
			className={className}
		>
			{children}
		</motion.div>
	);
}
