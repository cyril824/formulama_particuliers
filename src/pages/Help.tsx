import { ArrowLeft, Lightbulb, Zap, CheckCircle2, Lock, HelpCircle, AlertCircle, FileText, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const HelpPage = () => {
    const [openFAQ, setOpenFAQ] = useState<number | null>(null);
    const [activeSection, setActiveSection] = useState<string>("overview");
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleFAQ = (index: number) => {
        setOpenFAQ(openFAQ === index ? null : index);
    };

    const sections = [
        { id: "overview", label: "Vue d'ensemble", icon: Lightbulb },
        { id: "guide", label: "Guide d'utilisation", icon: Zap },
        { id: "documents", label: "Gestion des documents", icon: FileText },
        { id: "security", label: "Sécurité", icon: Lock },
        { id: "faq", label: "FAQ", icon: HelpCircle },
        { id: "support", label: "Support", icon: AlertCircle }
    ];

    const faqItems = [
        {
            question: "Comment dois-je télécharger mes documents ?",
            answer: "Accédez à la page d'accueil et utilisez la zone de dépôt (glisser-déposer) ou cliquez pour sélectionner vos fichiers. Les formats acceptés sont PDF, DOCX, PNG et autres formats courants. Une fois le fichier sélectionné, choisissez une catégorie et confirmez l'ajout."
        },
        {
            question: "Je ne retrouve pas un de mes documents",
            answer: "Utilisez le menu latéral pour naviguer par catégorie. Si vous avez oublié la catégorie, allez à l'accueil où les 4 documents les plus récents sont affichés. Vous pouvez également vérifier si le document a bien été téléchargé en consultant la liste complète dans chaque catégorie."
        },
        {
            question: "Puis-je modifier ou supprimer un document après téléchargement ?",
            answer: "Actuellement, vous pouvez visualiser vos documents. Pour des modifications, nous vous recommandons de mettre à jour le fichier localement et de télécharger la nouvelle version avec un nom clair pour suivre les versions."
        },
        {
            question: "Mes documents sont-ils sécurisés ?",
            answer: "Oui, vos documents sont stockés dans une base de données SQLite dédiée et ne sont accessibles que via votre compte personnel. Assurez-vous de garder vos identifiants confidentiels et de vous déconnecter après chaque utilisation."
        },
        {
            question: "Combien de documents puis-je télécharger ?",
            answer: "Il n'y a pas de limite stricte, mais plus vous avez de documents, plus important il est de les bien catégoriser pour les retrouver facilement."
        },
        {
            question: "Que faire si j'oublie mon mot de passe ?",
            answer: "Utilisez la fonction 'Mot de passe oublié' sur la page de connexion. Un e-mail de réinitialisation vous sera envoyé si vous avez fourni une adresse e-mail valide lors de votre inscription."
        },
        {
            question: "Comment organiser mes documents au mieux ?",
            answer: "Créez des catégories logiques selon vos besoins : 'Documents archivés', 'Documents en cours', 'Contrats', 'Assurances', etc. Nommez vos fichiers clairement avec la date (ex: 2025-02-06_Contrat_Bail.pdf) pour retrouver facilement."
        },
        {
            question: "L'application est-elle accessible sur mobile ?",
            answer: "Formulama est optimisé pour les appareils mobiles et tablettes. Vous pouvez accéder à vos documents depuis n'importe quel appareil en vous connectant avec vos identifiants."
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
            {/* En-tête */}
            <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <Link 
                            to="/dashboard?view=home" 
                            className="flex items-center gap-2 text-sm text-primary hover:text-primary-dark transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            <span>Retour</span>
                        </Link>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Centre d'Aide</h1>
                        <button 
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                        >
                            {mobileMenuOpen ? (
                                <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                            ) : (
                                <Menu className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row gap-6 p-4 sm:p-6 lg:p-8">
                    
                    {/* Barre latérale de navigation */}
                    <aside className={`${mobileMenuOpen ? 'block' : 'hidden'} md:block md:w-64 flex-shrink-0`}>
                        <nav className="sticky top-20 bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 space-y-1">
                            {sections.map(section => {
                                const Icon = section.icon;
                                return (
                                    <button
                                        key={section.id}
                                        onClick={() => {
                                            setActiveSection(section.id);
                                            setMobileMenuOpen(false);
                                        }}
                                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${
                                            activeSection === section.id
                                                ? 'bg-blue-600 text-white shadow-md'
                                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                        }`}
                                    >
                                        <Icon className="w-4 h-4" />
                                        <span className="text-sm">{section.label}</span>
                                    </button>
                                );
                            })}
                        </nav>
                    </aside>

                    {/* Contenu principal */}
                    <main className="flex-1">
                        {/* Vue d'ensemble */}
                        {activeSection === "overview" && (
                            <div className="space-y-6">
                                <div>
                                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Qu'est-ce que Formulama ?</h2>
                                    <p className="text-lg text-gray-600 dark:text-gray-400">Votre assistant personnel pour la gestion documentaire</p>
                                </div>

                                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 border-l-4 border-blue-600">
                                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                                        Formulama simplifie la gestion de vos documents administratifs. Moins de stress, plus de clarté.
                                    </p>
                                    
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div className="flex gap-4">
                                            <div className="flex-shrink-0">
                                                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                                                    <CheckCircle2 className="h-6 w-6 text-blue-600" />
                                                </div>
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-gray-900 dark:text-white">Centralisé</h3>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">Tous vos documents au même endroit</p>
                                            </div>
                                        </div>

                                        <div className="flex gap-4">
                                            <div className="flex-shrink-0">
                                                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-green-100 dark:bg-green-900/30">
                                                    <CheckCircle2 className="h-6 w-6 text-green-600" />
                                                </div>
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-gray-900 dark:text-white">Organisé</h3>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">Catégorisez facilement vos fichiers</p>
                                            </div>
                                        </div>

                                        <div className="flex gap-4">
                                            <div className="flex-shrink-0">
                                                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-purple-100 dark:bg-purple-900/30">
                                                    <CheckCircle2 className="h-6 w-6 text-purple-600" />
                                                </div>
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-gray-900 dark:text-white">Sécurisé</h3>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">Vos données bien protégées</p>
                                            </div>
                                        </div>

                                        <div className="flex gap-4">
                                            <div className="flex-shrink-0">
                                                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-orange-100 dark:bg-orange-900/30">
                                                    <CheckCircle2 className="h-6 w-6 text-orange-600" />
                                                </div>
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-gray-900 dark:text-white">Simple</h3>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">Interface intuitive accessible à tous</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Guide d'utilisation */}
                        {activeSection === "guide" && (
                            <div className="space-y-6">
                                <div>
                                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Guide d'utilisation</h2>
                                    <p className="text-lg text-gray-600 dark:text-gray-400">Apprenez à utiliser Formulama en 5 étapes simples</p>
                                </div>

                                <div className="space-y-4">
                                    {[
                                        { num: 1, title: "Se connecter à votre compte", desc: "Utilisez vos identifiants pour accéder à votre espace personnel. Chaque compte est protégé et votre contenu est complètement privé.", color: "blue" },
                                        { num: 2, title: "Explorer le Tableau de Bord", desc: "Une fois connecté, vous arrivez sur votre tableau de bord avec l'aperçu de vos documents récents et un menu pour naviguer.", color: "indigo" },
                                        { num: 3, title: "Ajouter vos documents", desc: "Sur la page d'accueil, utilisez la zone de dépôt pour télécharger vos fichiers. Choisissez une catégorie et validez.", color: "purple" },
                                        { num: 4, title: "Consulter vos documents", desc: "Accédez à vos documents depuis le menu latéral en sélectionnant une catégorie. Visualisez les détails et vérifiez les dates.", color: "pink" },
                                        { num: 5, title: "Gérer votre profil", desc: "Mettez à jour vos informations personnelles, changez votre mot de passe et gérez vos préférences.", color: "rose" }
                                    ].map(step => (
                                        <div key={step.num} className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border-l-4 border-blue-600 hover:shadow-lg transition-shadow">
                                            <div className="flex gap-4">
                                                <div className={`flex-shrink-0 h-10 w-10 rounded-full bg-${step.color}-100 dark:bg-${step.color}-900/30 flex items-center justify-center font-bold text-${step.color}-600`}>
                                                    {step.num}
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{step.title}</h3>
                                                    <p className="text-gray-600 dark:text-gray-400 text-sm">{step.desc}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Gestion des documents */}
                        {activeSection === "documents" && (
                            <div className="space-y-6">
                                <div>
                                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Gestion des documents</h2>
                                    <p className="text-lg text-gray-600 dark:text-gray-400">Organisez vos fichiers efficacement</p>
                                </div>

                                <div className="grid gap-4">
                                    {[
                                        { title: "Formats acceptés", content: "PDF, DOCX, PNG, JPG, GIF, TXT et autres formats courants." },
                                        { title: "Créer des catégories", content: "«Contrats», «Assurances», «Impôts», «Archivés». Les catégories facilitent le retrouver." },
                                        { title: "Aperçu des documents", content: "La section d'accueil affiche les 4 derniers documents téléchargés." },
                                        { title: "Conseils de nommage", content: "Utilisez le format: 2025-02-06_Contrat_Assurance.pdf pour un meilleur suivi." }
                                    ].map((item, i) => (
                                        <div key={i} className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                                            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                                            <p className="text-gray-600 dark:text-gray-400 text-sm">{item.content}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Sécurité */}
                        {activeSection === "security" && (
                            <div className="space-y-6">
                                <div>
                                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Sécurité et confidentialité</h2>
                                    <p className="text-lg text-gray-600 dark:text-gray-400">Vos données sont traitées avec la plus grande confidentialité</p>
                                </div>

                                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 border-l-4 border-green-600">
                                    <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                        <Lock className="w-5 h-5 text-green-600" />
                                        Mesures de sécurité
                                    </h3>
                                    <ul className="space-y-3">
                                        {[
                                            "Authentification sécurisée par compte personnel",
                                            "Chiffrement des données sensibles",
                                            "Stockage dans une base de données SQLite dédiée",
                                            "Accès limité à votre compte uniquement",
                                            "Sauvegardes régulières"
                                        ].map((item, i) => (
                                            <li key={i} className="flex gap-3 text-sm text-gray-600 dark:text-gray-400">
                                                <span className="text-green-600 font-bold">✓</span>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 border-l-4 border-orange-600">
                                    <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Bonnes pratiques</h3>
                                    <ul className="space-y-3">
                                        {[
                                            "Gardez votre mot de passe secret",
                                            "Déconnectez-vous après chaque utilisation",
                                            "N'utilisez pas sur des ordinateurs publics",
                                            "Signalez tout accès suspects immédiatement"
                                        ].map((item, i) => (
                                            <li key={i} className="flex gap-3 text-sm text-gray-600 dark:text-gray-400">
                                                <span className="text-orange-600 font-bold">•</span>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}

                        {/* FAQ */}
                        {activeSection === "faq" && (
                            <div className="space-y-6">
                                <div>
                                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Questions fréquemment posées</h2>
                                    <p className="text-lg text-gray-600 dark:text-gray-400">Trouvez les réponses à vos questions</p>
                                </div>

                                <div className="space-y-3">
                                    {faqItems.map((item, index) => (
                                        <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                                            <button
                                                onClick={() => toggleFAQ(index)}
                                                className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                                            >
                                                <span className="font-semibold text-gray-900 dark:text-white">{item.question}</span>
                                                <span className={`transform transition-transform text-blue-600 ${openFAQ === index ? 'rotate-180' : ''}`}>▼</span>
                                            </button>
                                            {openFAQ === index && (
                                                <div className="px-6 pb-6 bg-gray-50 dark:bg-gray-700/30 border-t border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400">
                                                    {item.answer}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Support */}
                        {activeSection === "support" && (
                            <div className="space-y-6">
                                <div>
                                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Besoin d'aide ?</h2>
                                    <p className="text-lg text-gray-600 dark:text-gray-400">Nous sommes ici pour vous aider</p>
                                </div>

                                <div className="space-y-4">
                                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 border-l-4 border-blue-600">
                                        <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                            <AlertCircle className="w-5 h-5 text-blue-600" />
                                            Dépannage rapide
                                        </h3>
                                        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                                            <li>• Essayez de vous reconnecter à votre compte</li>
                                            <li>• Videz le cache de votre navigateur</li>
                                            <li>• Vérifiez que vous utilisez une version à jour du navigateur</li>
                                            <li>• Assurez-vous que votre connexion internet est stable</li>
                                        </ul>
                                    </div>

                                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 border-l-4 border-purple-600">
                                        <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Le problème persiste ?</h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                                            Consultez la section "Paramètres" de votre compte pour obtenir les informations de contact ou visitez notre page de support.
                                        </p>
                                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors">
                                            Contacter le support
                                        </button>
                                    </div>
                                </div>

                                <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-8 border border-blue-200 dark:border-blue-700/50">
                                    <div className="flex items-start gap-4">
                                        <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                                        <div>
                                            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Merci d'utiliser Formulama</h3>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">Votre confiance est importante pour nous. Nous travaillons continuellement pour améliorer votre expérience.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default HelpPage;