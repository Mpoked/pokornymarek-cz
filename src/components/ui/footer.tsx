'use client';
import React from 'react';
import type { ComponentProps, ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { MailIcon } from 'lucide-react';
import { scrollToSection } from '@/lib/scroll';
import { FIRMA } from '@/lib/firma';

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
		label: 'Web',
		links: [
			{ title: 'Služby', href: '#sluzby' },
			{ title: 'Ceník', href: '#cenik' },
			{ title: 'Ukázky', href: '#ukazky' },
			{ title: 'Kontakt', href: '#kontakt' },
		],
	},
	{
		label: 'Kontakt',
		links: [
			{ title: FIRMA.email, href: `mailto:${FIRMA.email}`, icon: MailIcon, external: true },
			{ title: FIRMA.telefon, href: `tel:${FIRMA.telefonHref}`, external: true },
		],
	},
];

export function Footer() {
	return (
		<footer className="relative mx-auto w-full max-w-6xl rounded-t-4xl border-t border-white/10 bg-[radial-gradient(35%_128px_at_50%_0%,theme(backgroundColor.white/8%),transparent)] px-6 py-14 md:rounded-t-6xl lg:px-10 lg:py-16">
			<div className="absolute top-0 left-1/2 h-px w-1/3 max-w-[240px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/20 blur" />

			<div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between md:gap-8">
				{/* Značka */}
				<AnimatedContainer className="max-w-xs space-y-4">
					<span className="block text-sm font-bold tracking-widest uppercase text-white">
						{FIRMA.jmeno}
					</span>
					<p className="text-sm leading-relaxed text-white/50">
						Weby pro živnostníky a malé firmy z {FIRMA.mestoGen} a okolí.
						Od 9 900 Kč, bez agentury mezi námi.
					</p>
				</AnimatedContainer>

				{/* Navigační sloupce */}
				<div className="grid grid-cols-2 gap-10 sm:gap-16 md:gap-20">
					{footerLinks.map((section, index) => (
						<AnimatedContainer key={section.label} delay={0.1 + index * 0.1}>
							<h3 className="text-xs uppercase tracking-widest text-white/50 font-mono">{section.label}</h3>
							<ul className="text-white/60 mt-4 space-y-3 text-sm">
								{section.links.map((link) => (
									<li key={link.title}>
										{link.external ? (
											<a
												href={link.href}
												className="hover:text-white inline-flex items-center transition-colors duration-300"
											>
												{link.icon && <link.icon className="me-1.5 size-4 shrink-0" />}
												{link.title}
											</a>
										) : (
											<a
												href={link.href}
												onClick={(e) => {
													e.preventDefault();
													scrollToSection(link.href.replace('#', ''));
												}}
												className="hover:text-white inline-flex items-center transition-colors duration-300"
											>
												{link.icon && <link.icon className="me-1.5 size-4 shrink-0" />}
												{link.title}
											</a>
										)}
									</li>
								))}
							</ul>
						</AnimatedContainer>
					))}
				</div>
			</div>

			{/* Spodní pruh */}
			<AnimatedContainer
				delay={0.3}
				className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-white/40 sm:flex-row sm:items-center sm:justify-between"
			>
				{/* IČO a sídlo nejsou jen formalita — u lokální služby je to
				    důkaz, že za webem stojí dohledatelný člověk. */}
				<p>
					{`© ${new Date().getFullYear()} ${FIRMA.jmeno} · IČO ${FIRMA.ico} · ${FIRMA.mesto}`}
				</p>
				<a
					href="/ochrana-osobnich-udaju"
					className="hover:text-white transition-colors duration-300"
				>
					Ochrana osobních údajů
				</a>
			</AnimatedContainer>
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
