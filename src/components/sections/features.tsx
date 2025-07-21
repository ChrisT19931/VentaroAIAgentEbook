'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { 
  Brain, 
  Target, 
  Rocket, 
  Shield, 
  Zap, 
  TrendingUp, 
  Users, 
  CheckCircle,
  Clock,
  DollarSign,
  Lightbulb,
  BarChart3
} from 'lucide-react'

const features = [
  {
    icon: Brain,
    title: 'AI Strategy Clarity',
    description: 'Cut through the hype and understand exactly what AI can and cannot do for your business right now.',
    color: 'from-blue-500 to-purple-600'
  },
  {
    icon: Target,
    title: 'Actionable Implementation',
    description: 'Step-by-step guides to implement AI solutions that actually move the needle for your business.',
    color: 'from-green-500 to-teal-600'
  },
  {
    icon: Rocket,
    title: 'Future-Proof Planning',
    description: 'Prepare for upcoming AI developments and position your business ahead of the competition.',
    color: 'from-orange-500 to-red-600'
  },
  {
    icon: Shield,
    title: 'Risk Mitigation',
    description: 'Avoid costly AI implementation mistakes that could set your business back months or years.',
    color: 'from-purple-500 to-pink-600'
  },
  {
    icon: Zap,
    title: 'Quick Wins',
    description: 'Discover AI tools and techniques you can implement today to see immediate results.',
    color: 'from-yellow-500 to-orange-600'
  },
  {
    icon: TrendingUp,
    title: 'Competitive Advantage',
    description: 'Learn how to use AI to outpace competitors and capture market opportunities.',
    color: 'from-indigo-500 to-blue-600'
  }
]

const benefits = [
  {
    icon: Clock,
    title: 'Save Time',
    description: 'Stop wasting months researching. Get the essential AI knowledge in one comprehensive guide.',
    stat: '100+ Hours'
  },
  {
    icon: DollarSign,
    title: 'Save Money',
    description: 'Avoid expensive AI implementation mistakes that could cost thousands in wasted resources.',
    stat: '$10,000+'
  },
  {
    icon: Lightbulb,
    title: 'Gain Clarity',
    description: 'Transform confusion into confidence with clear, actionable AI strategies.',
    stat: '15 Chapters'
  },
  {
    icon: BarChart3,
    title: 'Boost Results',
    description: 'Implement proven AI techniques that deliver measurable business improvements.',
    stat: '3x ROI'
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6
    }
  }
}

export function Features() {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container-section">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-brand-navy mb-6">
            What You'll <span className="text-gradient">Discover</span>
          </h2>
          <p className="text-xl text-brand-steel max-w-3xl mx-auto leading-relaxed">
            This isn't just another AI book. It's your practical roadmap to understanding, 
            implementing, and mastering AI in your business.
          </p>
        </motion.div>

        {/* Main Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
        >
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <motion.div key={index} variants={itemVariants}>
                <Card className="h-full group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-8">
                    <div className="space-y-4">
                      {/* Icon */}
                      <div className="relative">
                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} p-4 group-hover:scale-110 transition-transform duration-300`}>
                          <IconComponent className="w-full h-full text-white" />
                        </div>
                        <div className={`absolute inset-0 w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-300`} />
                      </div>
                      
                      {/* Content */}
                      <div>
                        <h3 className="text-xl font-bold text-brand-navy mb-3 group-hover:text-brand-steel transition-colors">
                          {feature.title}
                        </h3>
                        <p className="text-brand-steel leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-r from-brand-navy to-brand-charcoal rounded-3xl p-12 text-white"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Why This Book Is <span className="text-brand-gold">Essential</span>
            </h3>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              In a world where AI changes daily, you need guidance that cuts through the noise.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="text-center group"
                >
                  <div className="mb-4">
                    <div className="w-16 h-16 bg-brand-gold/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-brand-gold/30 transition-colors">
                      <IconComponent className="w-8 h-8 text-brand-gold" />
                    </div>
                    <div className="text-2xl font-bold text-brand-gold mb-2">
                      {benefit.stat}
                    </div>
                  </div>
                  <h4 className="text-lg font-bold mb-2">{benefit.title}</h4>
                  <p className="text-white/80 text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* What's Inside Preview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-20 text-center"
        >
          <h3 className="text-3xl md:text-4xl font-display font-bold text-brand-navy mb-8">
            What's <span className="text-gradient">Inside</span>
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                title: 'Part 1: What You Aren\'t Doing',
                items: [
                  'Common AI misconceptions',
                  'Hidden implementation barriers',
                  'Missed opportunities analysis',
                  'Competitive gap assessment'
                ]
              },
              {
                title: 'Part 2: What You Can Do',
                items: [
                  'Immediate AI implementations',
                  'Low-cost, high-impact solutions',
                  'Tool recommendations',
                  'Step-by-step guides'
                ]
              },
              {
                title: 'Part 3: What You Will Be Able to Do',
                items: [
                  'Future AI capabilities',
                  'Strategic planning framework',
                  'Investment roadmap',
                  'Competitive positioning'
                ]
              }
            ].map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
              >
                <h4 className="text-lg font-bold text-brand-navy mb-4">
                  {section.title}
                </h4>
                <ul className="space-y-2 text-left">
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-brand-gold mt-0.5 flex-shrink-0" />
                      <span className="text-brand-steel text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}