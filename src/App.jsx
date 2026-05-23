import React, { useState, useEffect, useRef } from 'react';

import { Home, UtensilsCrossed, Users, User, ChefHat, MapPin, Heart, ArrowLeft, Camera, Check, Clock, Star, Plus, MessageCircle, HelpCircle, Compass, ShoppingBasket, Sparkles, Shuffle, RotateCw } from 'lucide-react';



export default function WhatToEatToday() {

  const [screen, setScreen] = useState('onboarding');

  const [hasAvatar, setHasAvatar] = useState(false);

  const [selectedAvatar, setSelectedAvatar] = useState(null);

  const [avatarStep, setAvatarStep] = useState(0);

  const [avatarPath, setAvatarPath] = useState(null);

  const [healthMode, setHealthMode] = useState(false);

  const [selectedHealthGoals, setSelectedHealthGoals] = useState([]);

  const [selectedMoods, setSelectedMoods] = useState([]);

  const [dislikedFoods, setDislikedFoods] = useState([]);

  const [allergies, setAllergies] = useState([]);

  const [communityTab, setCommunityTab] = useState('discover');

  

  // QQ秀-style customization state

  const [customGender, setCustomGender] = useState('female'); // 'male' or 'female'

  const [customHair, setCustomHair] = useState(0);

  const [customOutfit, setCustomOutfit] = useState(0);

  const [customAccessory, setCustomAccessory] = useState(0);

  const [customBg, setCustomBg] = useState(0);



  // Random picker state

  const [randomMode, setRandomMode] = useState('cook');

  const [randomResult, setRandomResult] = useState(null);

  const [isRolling, setIsRolling] = useState(false);

  const [rollingIndex, setRollingIndex] = useState(0);

  const [showRestrictions, setShowRestrictions] = useState(false);

  const [restrictions, setRestrictions] = useState([]);



  const greeting = () => {

    const hour = new Date().getHours();

    if (hour < 11) return { text: "早上好 ☀️", sub: "今天早餐想吃什么?" };

    if (hour < 14) return { text: "中午好 🌼", sub: "该想想午饭啦" };

    if (hour < 17) return { text: "下午好 🍪", sub: "提前想想晚饭吃啥?" };

    if (hour < 21) return { text: "晚上好 🌙", sub: "饿了吗?" };

    return { text: "夜深啦 🌃", sub: "来点温暖的宵夜?" };

  };



  // QQ秀-style asset options

  const hairOptions = {

    female: [

      { id: 'f-short', name: '短发', color: '#3d2818' },

      { id: 'f-long', name: '长发', color: '#5c3920' },

      { id: 'f-bun', name: '丸子头', color: '#4a2c1a' },

      { id: 'f-curly', name: '卷发', color: '#6b4423' },

    ],

    male: [

      { id: 'm-short', name: '短发', color: '#2a1810' },

      { id: 'm-long', name: '中长', color: '#3d2818' },

      { id: 'm-spiky', name: '刺头', color: '#1a0f08' },

      { id: 'm-side', name: '侧分', color: '#4a2c1a' },

    ],

  };

  

  const outfitOptions = [

    { id: 'apron', name: '围裙', emoji: '🧑‍🍳', color: '#fb923c' },

    { id: 'tshirt', name: 'T恤', emoji: '👕', color: '#5eead4' },

    { id: 'hoodie', name: '卫衣', emoji: '🧥', color: '#fcd34d' },

    { id: 'dress', name: '连衣裙', emoji: '👗', color: '#fda4af' },

  ];



  const accessoryOptions = [

    { id: 'none', name: '无', emoji: '' },

    { id: 'chef-hat', name: '厨师帽', emoji: '🎩' },

    { id: 'glasses', name: '眼镜', emoji: '👓' },

    { id: 'flower', name: '花朵', emoji: '🌸' },

  ];



  const bgOptions = [

    { id: 'orange', color: 'from-orange-200 to-amber-200' },

    { id: 'teal', color: 'from-teal-200 to-emerald-200' },

    { id: 'pink', color: 'from-rose-200 to-pink-200' },

    { id: 'blue', color: 'from-sky-200 to-blue-200' },

  ];



  const dishSuggestions = [

    { name: '番茄鸡蛋面', emoji: '🍜', time: '15 分钟', why: '忙碌一天最治愈的味道', tags: ['简单', '舒心'], type: 'cook' },

    { name: '清蒸鲈鱼', emoji: '🐟', time: '25 分钟', why: '清淡鲜美,营养均衡', tags: ['健康', '清淡'], type: 'cook' },

    { name: '麻婆豆腐', emoji: '🌶️', time: '20 分钟', why: '经典川菜,下饭神器', tags: ['辣', '下饭'], type: 'cook' },

    { name: '皮蛋瘦肉粥', emoji: '🥣', time: '30 分钟', why: '暖胃又暖心', tags: ['舒心', '温和'], type: 'cook' },

    { name: '青椒肉丝', emoji: '🥢', time: '15 分钟', why: '简单家常,百吃不厌', tags: ['家常', '快手'], type: 'cook' },

    { name: '红烧排骨', emoji: '🍖', time: '40 分钟', why: '妈妈的味道,温暖治愈', tags: ['家常', '下饭'], type: 'cook' },

    { name: '蛋炒饭', emoji: '🍚', time: '10 分钟', why: '随手就有的快手菜', tags: ['快手', '简单'], type: 'cook' },

    { name: '凉拌黄瓜', emoji: '🥒', time: '5 分钟', why: '清爽开胃的小菜', tags: ['清爽', '夏天'], type: 'cook' },

  ];



  const restaurants = [

    { name: '王阿姨面馆', cuisine: '本地面食', rating: 4.8, time: '步行 5 分钟', emoji: '🍲', tag: '宝藏小店' },

    { name: '夕阳点心', cuisine: '广式点心', rating: 4.6, time: '步行 12 分钟', emoji: '🥟', tag: '热门' },

    { name: '小四川', cuisine: '川菜', rating: 4.7, time: '步行 8 分钟', emoji: '🌶️', tag: '辣' },

    { name: '稻香日料', cuisine: '日本料理', rating: 4.5, time: '步行 10 分钟', emoji: '🍱', tag: '精致' },

    { name: '小笼包之家', cuisine: '上海菜', rating: 4.9, time: '步行 7 分钟', emoji: '🥟', tag: '招牌' },

    { name: '街角咖啡', cuisine: '轻食咖啡', rating: 4.4, time: '步行 3 分钟', emoji: '☕', tag: '附近' },

  ];



  const communityPosts = [

    { user: '小美', dish: '今晚做了番茄鸡蛋面!', emoji: '🍜', reactions: { yum: 12, save: 5, curious: 2 }, time: '2 小时前', avatarConfig: { gender: 'female', hair: 0, outfit: 0, accessory: 1, bg: 0 } },

    { user: '阿成', dish: '人民广场附近的小笼包绝了!', emoji: '🥟', reactions: { yum: 24, save: 18, curious: 6 }, time: '5 小时前', avatarConfig: { gender: 'male', hair: 2, outfit: 1, accessory: 0, bg: 1 } },

    { user: '小林', dish: '下雨天最适合一碗热粥 💛', emoji: '🥣', reactions: { yum: 8, save: 3, curious: 1 }, time: '1 天前', avatarConfig: { gender: 'female', hair: 1, outfit: 3, accessory: 3, bg: 2 } },

  ];



  const askPosts = [

    { user: '小薇', question: '剩下的鸡肉怎么做好吃?', replies: 7, time: '30 分钟前', avatarConfig: { gender: 'female', hair: 3, outfit: 2, accessory: 0, bg: 2 } },

    { user: '佳佳', question: '北京哪里有好吃的素饺子?', replies: 12, time: '2 小时前', avatarConfig: { gender: 'male', hair: 0, outfit: 1, accessory: 2, bg: 3 } },

  ];



  const restrictionOptions = [

    { id: 'spicy', label: '不吃辣' },

    { id: 'seafood', label: '不吃海鲜' },

    { id: 'beef', label: '不吃牛肉' },

    { id: 'pork', label: '不吃猪肉' },

    { id: 'cilantro', label: '不吃香菜' },

    { id: 'cold', label: '不吃凉的' },

  ];



  // Health goals - multi-category, multi-select

  const healthGoals = [

    // Body conditions

    { id: 'diabetes', label: '糖尿病友好', emoji: '🩺', category: 'condition' },

    { id: 'hypertension', label: '高血压', emoji: '💗', category: 'condition' },

    { id: 'cholesterol', label: '高血脂', emoji: '🫀', category: 'condition' },

    { id: 'gout', label: '痛风友好', emoji: '🦴', category: 'condition' },

    { id: 'gastric', label: '养胃护胃', emoji: '🌾', category: 'condition' },

    // Fitness goals

    { id: 'weight-loss', label: '减肥瘦身', emoji: '⚖️', category: 'fitness' },

    { id: 'fat-burn', label: '减脂', emoji: '🔥', category: 'fitness' },

    { id: 'muscle', label: '增肌', emoji: '💪', category: 'fitness' },

    { id: 'high-protein', label: '高蛋白', emoji: '🥩', category: 'fitness' },

    { id: 'low-carb', label: '低碳水', emoji: '🥗', category: 'fitness' },

    { id: 'low-cal', label: '低热量', emoji: '🍃', category: 'fitness' },

    // Women's wellness

    { id: 'menstrual', label: '经期调理', emoji: '🌸', category: 'women' },

    { id: 'blood-tonic', label: '补血养颜', emoji: '🌹', category: 'women' },

    { id: 'pregnancy', label: '孕期营养', emoji: '🤱', category: 'women' },

    { id: 'postpartum', label: '产后修复', emoji: '🍼', category: 'women' },

    // General wellness

    { id: 'immunity', label: '提升免疫', emoji: '🛡️', category: 'wellness' },

    { id: 'sleep', label: '助眠安神', emoji: '😴', category: 'wellness' },

    { id: 'detox', label: '清肠排毒', emoji: '🍵', category: 'wellness' },

    { id: 'energy', label: '补气养神', emoji: '⚡', category: 'wellness' },

    { id: 'kids', label: '儿童营养', emoji: '👶', category: 'wellness' },

    { id: 'elderly', label: '老人易消化', emoji: '👵', category: 'wellness' },

  ];



  // Mood filter options

  const moodOptions = [

    { id: 'comfort', label: '想要治愈', emoji: '🛋️' },

    { id: 'tired', label: '太累了', emoji: '😮‍💨' },

    { id: 'happy', label: '心情很好', emoji: '😊' },

    { id: 'stressed', label: '压力大', emoji: '😣' },

    { id: 'lazy', label: '懒得动', emoji: '🦥' },

    { id: 'sick', label: '感冒不适', emoji: '🤧' },

    { id: 'sad', label: '不开心', emoji: '🥺' },

    { id: 'excited', label: '想犒劳自己', emoji: '🎉' },

  ];



  // Dislike options - things I don't want today

  const dislikeOptions = [

    { id: 'spicy-now', label: '辣的' },

    { id: 'oily', label: '油腻的' },

    { id: 'soup', label: '汤汤水水' },

    { id: 'heavy', label: '太重口' },

    { id: 'cold-food', label: '凉的' },

    { id: 'fried', label: '油炸' },

    { id: 'sweet', label: '太甜' },

    { id: 'sour', label: '酸的' },

    { id: 'noodle', label: '面食' },

    { id: 'rice', label: '米饭' },

  ];



  // Allergy / cannot eat

  const allergyOptions = [

    { id: 'seafood-a', label: '🦐 海鲜' },

    { id: 'peanut', label: '🥜 花生' },

    { id: 'dairy', label: '🥛 乳制品' },

    { id: 'egg', label: '🥚 鸡蛋' },

    { id: 'gluten', label: '🌾 麸质' },

    { id: 'beef-a', label: '🥩 牛肉' },

    { id: 'mutton', label: '🐑 羊肉' },

    { id: 'cilantro-a', label: '🌿 香菜' },

  ];



  const toggleRestriction = (id) => {

    setRestrictions(prev => prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]);

  };



  const toggleHealthGoal = (id) => {

    setSelectedHealthGoals(prev => prev.includes(id) ? prev.filter(g => g !== id) : [...prev, id]);

  };



  const toggleMood = (id) => {

    setSelectedMoods(prev => prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]);

  };



  const toggleDislike = (id) => {

    setDislikedFoods(prev => prev.includes(id) ? prev.filter(d => d !== id) : [...prev, id]);

  };



  const toggleAllergy = (id) => {

    setAllergies(prev => prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]);

  };



  const currentAvatarConfig = {

    gender: customGender,

    hair: customHair,

    outfit: customOutfit,

    accessory: customAccessory,

    bg: customBg,

  };



  // Roll the random picker

  const rollRandom = () => {

    setIsRolling(true);

    setRandomResult(null);

    const cards = randomMode === 'cook' ? dishSuggestions : restaurants;

    let count = 0;

    const interval = setInterval(() => {

      setRollingIndex(Math.floor(Math.random() * cards.length));

      count++;

      if (count > 15) {

        clearInterval(interval);

        const final = cards[Math.floor(Math.random() * cards.length)];

        setRandomResult(final);

        setIsRolling(false);

      }

    }, 80);

  };



  // ============ ONBOARDING ============

  if (screen === 'onboarding') {

    return (

      <div className="w-full max-w-sm mx-auto bg-gradient-to-b from-orange-50 to-amber-50 min-h-screen flex flex-col items-center justify-center p-6 text-center">

        <div className="text-7xl mb-4 animate-bounce">🍳</div>

        <h1 className="text-3xl font-bold text-orange-900 mb-2">今天吃什么</h1>

        <p className="text-orange-700 mb-1 text-sm">你的暖心小厨房</p>

        <p className="text-orange-600 mb-10 text-xs">每一餐都不再纠结 💛</p>

        

        <button 

          onClick={() => setScreen('avatarCreate')}

          className="w-full bg-orange-500 text-white py-4 rounded-2xl font-semibold shadow-lg shadow-orange-200 active:scale-95 transition-transform"

        >

          开始使用 →

        </button>

        <button 

          onClick={() => { setHasAvatar(true); setScreen('home'); }}

          className="mt-3 text-orange-500 text-sm"

        >

          跳过

        </button>

      </div>

    );

  }



  // ============ AVATAR CREATION ============

  if (screen === 'avatarCreate') {

    // Path selection

    if (avatarStep === 0) {

      return (

        <div className="w-full max-w-sm mx-auto bg-gradient-to-b from-orange-50 to-amber-50 min-h-screen p-6">

          <button onClick={() => setScreen('onboarding')} className="mb-4 text-orange-700">

            <ArrowLeft size={24} />

          </button>



          <div className="text-center pt-4">

            <div className="text-6xl mb-3">✨</div>

            <h2 className="text-2xl font-bold text-orange-900 mb-2">创建你的专属形象</h2>

            <p className="text-orange-700 text-sm mb-8 px-4">选择一种方式,生成你的 3D 美食伙伴 🎨</p>

            

            <button 

              onClick={() => { setAvatarPath('photo'); setAvatarStep(1); }}

              className="w-full bg-white rounded-3xl p-5 mb-3 shadow-md active:scale-98 transition text-left flex items-center gap-4"

            >

              <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-amber-400 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0">

                ✨

              </div>

              <div className="flex-1">

                <h3 className="font-bold text-gray-900 mb-0.5">AI 生成专属形象</h3>

                <p className="text-xs text-gray-500">上传照片,生成独一无二的 3D 卡通形象</p>

              </div>

              <span className="text-orange-400">›</span>

            </button>



            <button 

              onClick={() => { setAvatarPath('default'); setAvatarStep('custom'); }}

              className="w-full bg-white rounded-3xl p-5 shadow-md active:scale-98 transition text-left flex items-center gap-4"

            >

              <div className="w-16 h-16 bg-gradient-to-br from-teal-300 to-emerald-300 rounded-2xl flex items-center justify-center flex-shrink-0">

                <QQAvatar config={{ gender: 'female', hair: 1, outfit: 0, accessory: 1, bg: 0 }} size="sm" hideBg />

              </div>

              <div className="flex-1">

                <h3 className="font-bold text-gray-900 mb-0.5">自定义形象</h3>

                <p className="text-xs text-gray-500">DIY 你的专属小人,自由搭配</p>

              </div>

              <span className="text-orange-400">›</span>

            </button>



            <p className="text-xs text-orange-500 mt-8">🔒 上传的照片仅用于生成形象,不会保存</p>

          </div>

        </div>

      );

    }



    // QQ秀-style customization

    if (avatarStep === 'custom') {

      const [activeTab, setActiveTab] = ['hair', 'outfit', 'accessory', 'bg'];

      return <QQXiuCustomization 

        config={currentAvatarConfig}

        customGender={customGender} setCustomGender={setCustomGender}

        customHair={customHair} setCustomHair={setCustomHair}

        customOutfit={customOutfit} setCustomOutfit={setCustomOutfit}

        customAccessory={customAccessory} setCustomAccessory={setCustomAccessory}

        customBg={customBg} setCustomBg={setCustomBg}

        hairOptions={hairOptions}

        outfitOptions={outfitOptions}

        accessoryOptions={accessoryOptions}

        bgOptions={bgOptions}

        onBack={() => setAvatarStep(0)}

        onDone={() => { setSelectedAvatar(currentAvatarConfig); setHasAvatar(true); setScreen('home'); }}

      />;

    }



    // AI photo path

    if (avatarStep === 1) {

      return (

        <div className="w-full max-w-sm mx-auto bg-gradient-to-b from-orange-50 to-amber-50 min-h-screen p-6">

          <button onClick={() => setAvatarStep(0)} className="mb-4 text-orange-700">

            <ArrowLeft size={24} />

          </button>



          <div className="text-center pt-4">

            <div className="text-6xl mb-3">📸</div>

            <h2 className="text-2xl font-bold text-orange-900 mb-2">上传你的照片</h2>

            <p className="text-orange-700 text-sm mb-8">AI 会生成你独一无二的 3D 形象</p>

            

            <div className="bg-white rounded-3xl p-6 shadow-sm mb-6">

              <div className="border-2 border-dashed border-orange-300 rounded-2xl p-8 flex flex-col items-center">

                <Camera size={48} className="text-orange-400 mb-3" />

                <p className="text-orange-600 text-sm font-medium">点击上传照片</p>

                <p className="text-orange-400 text-xs mt-1">建议正面清晰照片</p>

              </div>

            </div>



            <p className="text-xs text-orange-500 mb-4">🔒 照片仅本地处理,不会上传保存</p>



            <button 

              onClick={() => setAvatarStep(2)}

              className="w-full bg-orange-500 text-white py-4 rounded-2xl font-semibold shadow-lg shadow-orange-200 active:scale-95"

            >

              选择照片

            </button>

          </div>

        </div>

      );

    }



    if (avatarStep === 2) {

      return (

        <div className="w-full max-w-sm mx-auto bg-gradient-to-b from-orange-50 to-amber-50 min-h-screen p-6">

          <AvatarGenerating onDone={() => setAvatarStep(3)} />

        </div>

      );

    }



    if (avatarStep === 3) {

      return (

        <div className="w-full max-w-sm mx-auto bg-gradient-to-b from-orange-50 to-amber-50 min-h-screen p-6">

          <div className="text-center pt-6">

            <div className="text-5xl mb-3">🎉</div>

            <h2 className="text-2xl font-bold text-orange-900 mb-2">这就是你!</h2>

            <p className="text-orange-700 text-sm mb-6">专属的 3D 形象已生成</p>



            <div className="bg-white rounded-3xl p-8 shadow-lg mb-6 relative overflow-hidden">

              <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-amber-50 to-teal-50 opacity-50"></div>

              <div className="relative">

                <QQAvatar config={{ gender: 'female', hair: 1, outfit: 0, accessory: 1, bg: 0 }} size="xl" />

                <p className="text-sm font-bold text-gray-900 mt-4">我的专属形象</p>

                <div className="flex items-center justify-center gap-1 mt-1">

                  <Sparkles size={12} className="text-orange-400" />

                  <p className="text-xs text-orange-500">独一无二</p>

                  <Sparkles size={12} className="text-orange-400" />

                </div>

              </div>

            </div>



            <button 

              onClick={() => { setSelectedAvatar({ gender: 'female', hair: 1, outfit: 0, accessory: 1, bg: 0 }); setHasAvatar(true); setScreen('home'); }}

              className="w-full bg-orange-500 text-white py-4 rounded-2xl font-semibold shadow-lg shadow-orange-200 active:scale-95 mb-2"

            >

              就用这个! 💛

            </button>

            <button 

              onClick={() => { setAvatarStep('custom'); setSelectedAvatar({ gender: 'female', hair: 1, outfit: 0, accessory: 1, bg: 0 }); setCustomGender('female'); setCustomHair(1); setCustomOutfit(0); setCustomAccessory(1); setCustomBg(0); }}

              className="w-full text-orange-600 py-2 text-sm font-medium"

            >

              ✏️ 进一步自定义

            </button>

          </div>

        </div>

      );

    }

  }



  // ============ HOME ============

  if (screen === 'home') {

    const g = greeting();

    const avatarConfig = selectedAvatar || { gender: 'female', hair: 0, outfit: 0, accessory: 0, bg: 0 };

    return (

      <div className="w-full max-w-sm mx-auto bg-gradient-to-b from-orange-50 to-amber-50 min-h-screen pb-24">

        <div className="p-6">

          <div className="flex items-center justify-between mb-6">

            <div>

              <h1 className="text-2xl font-bold text-orange-900">{g.text}</h1>

              <p className="text-orange-600 text-sm">{g.sub}</p>

            </div>

            <button 

              onClick={() => setScreen('profile')}

              className="w-12 h-12 rounded-full shadow-sm overflow-hidden"

            >

              <QQAvatar config={avatarConfig} size="xs" />

            </button>

          </div>



          {/* Smart insight card */}

          <div className="bg-white rounded-3xl p-4 mb-3 shadow-sm flex items-start gap-3">

            <div className="flex-shrink-0 w-12 h-12 rounded-full overflow-hidden">

              <QQAvatar config={avatarConfig} size="xs" />

            </div>

            <div className="flex-1">

              <p className="text-sm text-gray-800 font-medium leading-relaxed">这周你吃了 <span className="text-orange-600 font-bold">3 次番茄炒蛋</span> 🍅</p>

              <p className="text-xs text-orange-600 mt-0.5">要不要换换口味?试试别的吧 ✨</p>

            </div>

          </div>



          <div className="bg-white rounded-3xl p-4 mb-4 shadow-sm">

            <p className="text-xs font-semibold text-gray-500 mb-2">📊 本周饮食小记</p>

            <div className="grid grid-cols-3 gap-2 text-center">

              <div>

                <div className="text-lg font-bold text-orange-600">7</div>

                <div className="text-xs text-gray-500">在家做饭</div>

              </div>

              <div>

                <div className="text-lg font-bold text-amber-600">4</div>

                <div className="text-xs text-gray-500">外出就餐</div>

              </div>

              <div>

                <div className="text-lg font-bold text-teal-600">2</div>

                <div className="text-xs text-gray-500">新菜尝试</div>

              </div>

            </div>

          </div>



          <button 

            onClick={() => setScreen('cook')}

            className="w-full bg-gradient-to-br from-orange-400 to-orange-500 rounded-3xl p-6 mb-3 text-left text-white shadow-lg shadow-orange-200 active:scale-98 transition"

          >

            <div className="flex items-center justify-between">

              <div>

                <ChefHat size={36} className="mb-3" />

                <h3 className="text-xl font-bold mb-1">在家做饭</h3>

                <p className="text-sm text-orange-50">今天做点什么好呢?</p>

              </div>

              <div className="text-5xl">🏠</div>

            </div>

          </button>



          <button 

            onClick={() => setScreen('eatout')}

            className="w-full bg-gradient-to-br from-amber-400 to-amber-500 rounded-3xl p-6 mb-3 text-left text-white shadow-lg shadow-amber-200 active:scale-98 transition"

          >

            <div className="flex items-center justify-between">

              <div>

                <MapPin size={36} className="mb-3" />

                <h3 className="text-xl font-bold mb-1">出门吃 / 点外卖</h3>

                <p className="text-sm text-amber-50">找找附近好吃的</p>

              </div>

              <div className="text-5xl">🍜</div>

            </div>

          </button>



          <button 

            onClick={() => { setScreen('random'); setRandomResult(null); }}

            className="w-full bg-gradient-to-br from-teal-400 to-emerald-500 rounded-3xl p-6 text-left text-white shadow-lg shadow-teal-200 active:scale-98 transition"

          >

            <div className="flex items-center justify-between">

              <div>

                <Sparkles size={36} className="mb-3" />

                <h3 className="text-xl font-bold mb-1">帮我决定吧!</h3>

                <p className="text-sm text-teal-50">选择困难症?一键随机推荐</p>

              </div>

              <div className="text-5xl">✨</div>

            </div>

          </button>

        </div>



        <BottomNav screen={screen} setScreen={setScreen} />

      </div>

    );

  }



  // ============ COOK AT HOME ============

  if (screen === 'cook') {

    return (

      <div className="w-full max-w-sm mx-auto bg-gradient-to-b from-orange-50 to-amber-50 min-h-screen pb-24">

        <div className="p-6">

          <button onClick={() => setScreen('home')} className="mb-4 text-orange-700">

            <ArrowLeft size={24} />

          </button>



          <h2 className="text-2xl font-bold text-orange-900 mb-1">在家做饭 🏠</h2>

          <p className="text-orange-600 text-sm mb-5">挑一道暖心好菜</p>



          {/* Health Mode - now multi-select */}

          <div className="bg-white rounded-2xl p-4 mb-4 shadow-sm">

            <div className="flex items-center justify-between mb-3">

              <div className="flex items-center gap-2">

                <Heart size={18} className="text-rose-500" />

                <span className="text-sm font-semibold text-gray-800">健康模式</span>

                {selectedHealthGoals.length > 0 && (

                  <span className="text-xs bg-rose-100 text-rose-600 px-2 py-0.5 rounded-full font-medium">{selectedHealthGoals.length} 项</span>

                )}

              </div>

              <button 

                onClick={() => { setHealthMode(!healthMode); if (healthMode) setSelectedHealthGoals([]); }}

                className={`w-12 h-7 rounded-full p-0.5 transition ${healthMode ? 'bg-orange-500' : 'bg-gray-300'}`}

              >

                <div className={`w-6 h-6 rounded-full bg-white shadow transition-transform ${healthMode ? 'translate-x-5' : ''}`}></div>

              </button>

            </div>

            {healthMode && (

              <div className="pt-3 border-t border-orange-100">

                <p className="text-xs text-gray-500 mb-3">选择你的健康目标(可多选,搭配组合)</p>

                

                <p className="text-xs font-semibold text-rose-600 mb-2">💪 身体状况</p>

                <div className="flex gap-2 flex-wrap mb-3">

                  {healthGoals.filter(g => g.category === 'condition').map(goal => (

                    <button 

                      key={goal.id}

                      onClick={() => toggleHealthGoal(goal.id)}

                      className={`text-xs px-3 py-1.5 rounded-full transition ${selectedHealthGoals.includes(goal.id) ? 'bg-rose-500 text-white shadow-sm shadow-rose-200' : 'bg-rose-50 text-rose-700'}`}

                    >

                      {goal.emoji} {goal.label}

                    </button>

                  ))}

                </div>



                <p className="text-xs font-semibold text-orange-600 mb-2">🎯 健身目标</p>

                <div className="flex gap-2 flex-wrap mb-3">

                  {healthGoals.filter(g => g.category === 'fitness').map(goal => (

                    <button 

                      key={goal.id}

                      onClick={() => toggleHealthGoal(goal.id)}

                      className={`text-xs px-3 py-1.5 rounded-full transition ${selectedHealthGoals.includes(goal.id) ? 'bg-orange-500 text-white shadow-sm shadow-orange-200' : 'bg-orange-50 text-orange-700'}`}

                    >

                      {goal.emoji} {goal.label}

                    </button>

                  ))}

                </div>



                <p className="text-xs font-semibold text-pink-600 mb-2">🌸 女性关怀</p>

                <div className="flex gap-2 flex-wrap mb-3">

                  {healthGoals.filter(g => g.category === 'women').map(goal => (

                    <button 

                      key={goal.id}

                      onClick={() => toggleHealthGoal(goal.id)}

                      className={`text-xs px-3 py-1.5 rounded-full transition ${selectedHealthGoals.includes(goal.id) ? 'bg-pink-500 text-white shadow-sm shadow-pink-200' : 'bg-pink-50 text-pink-700'}`}

                    >

                      {goal.emoji} {goal.label}

                    </button>

                  ))}

                </div>



                <p className="text-xs font-semibold text-teal-600 mb-2">🍃 调理养生</p>

                <div className="flex gap-2 flex-wrap">

                  {healthGoals.filter(g => g.category === 'wellness').map(goal => (

                    <button 

                      key={goal.id}

                      onClick={() => toggleHealthGoal(goal.id)}

                      className={`text-xs px-3 py-1.5 rounded-full transition ${selectedHealthGoals.includes(goal.id) ? 'bg-teal-500 text-white shadow-sm shadow-teal-200' : 'bg-teal-50 text-teal-700'}`}

                    >

                      {goal.emoji} {goal.label}

                    </button>

                  ))}

                </div>



                {selectedHealthGoals.length > 0 && (

                  <button 

                    onClick={() => setSelectedHealthGoals([])}

                    className="text-xs text-gray-500 mt-3 font-medium"

                  >

                    清空选择

                  </button>

                )}

              </div>

            )}

          </div>



          {/* Mood filter - now expandable with feelings + dislikes */}

          <div className="bg-white rounded-2xl p-4 mb-4 shadow-sm">

            <p className="text-sm font-semibold text-gray-700 mb-3">心情筛选 💭</p>

            

            <p className="text-xs text-gray-500 mb-2">今天的心情如何?</p>

            <div className="flex gap-2 flex-wrap mb-4">

              {moodOptions.map(mood => (

                <button 

                  key={mood.id}

                  onClick={() => toggleMood(mood.id)}

                  className={`text-xs px-3 py-1.5 rounded-full transition ${selectedMoods.includes(mood.id) ? 'bg-amber-500 text-white shadow-sm shadow-amber-200' : 'bg-amber-50 text-amber-700'}`}

                >

                  {mood.emoji} {mood.label}

                </button>

              ))}

            </div>



            <p className="text-xs text-gray-500 mb-2">今天不想吃什么?</p>

            <div className="flex gap-2 flex-wrap mb-4">

              {dislikeOptions.map(opt => (

                <button 

                  key={opt.id}

                  onClick={() => toggleDislike(opt.id)}

                  className={`text-xs px-3 py-1.5 rounded-full transition ${dislikedFoods.includes(opt.id) ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-600'}`}

                >

                  🚫 {opt.label}

                </button>

              ))}

            </div>



            <p className="text-xs text-gray-500 mb-2">⚠️ 过敏 / 不能吃</p>

            <div className="flex gap-2 flex-wrap">

              {allergyOptions.map(opt => (

                <button 

                  key={opt.id}

                  onClick={() => toggleAllergy(opt.id)}

                  className={`text-xs px-3 py-1.5 rounded-full transition ${allergies.includes(opt.id) ? 'bg-red-500 text-white shadow-sm shadow-red-200' : 'bg-red-50 text-red-700'}`}

                >

                  {opt.label}

                </button>

              ))}

            </div>



            {(selectedMoods.length + dislikedFoods.length + allergies.length > 0) && (

              <div className="mt-3 pt-3 border-t border-orange-50 flex items-center justify-between">

                <p className="text-xs text-orange-600 font-medium">已为你过滤这些选项 ✓</p>

                <button 

                  onClick={() => { setSelectedMoods([]); setDislikedFoods([]); setAllergies([]); }}

                  className="text-xs text-gray-500 font-medium"

                >

                  清空

                </button>

              </div>

            )}

          </div>



          <p className="text-sm font-semibold text-gray-700 mb-3">为你推荐 🌟</p>

          <div className="space-y-3">

            {dishSuggestions.slice(0, 4).map((dish, i) => (

              <div key={i} className="bg-white rounded-2xl p-4 shadow-sm">

                <div className="flex gap-3">

                  <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0">

                    {dish.emoji}

                  </div>

                  <div className="flex-1">

                    <h4 className="font-bold text-gray-900">{dish.name}</h4>

                    <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">

                      <Clock size={12} />

                      <span>{dish.time}</span>

                    </div>

                    <p className="text-xs text-orange-600 mt-1 italic">"{dish.why}"</p>

                    <div className="flex gap-1 mt-2">

                      {dish.tags.map(t => (

                        <span key={t} className="text-xs bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full">{t}</span>

                      ))}

                    </div>

                  </div>

                </div>

                <div className="flex gap-2 mt-3 pt-3 border-t border-orange-50">

                  <button className="flex-1 bg-orange-500 text-white text-xs py-2 rounded-xl font-medium active:scale-95">

                    就做这个

                  </button>

                  <button className="px-3 py-2 bg-amber-50 text-amber-700 text-xs rounded-xl flex items-center gap-1 active:scale-95">

                    <ShoppingBasket size={14} /> 购物清单

                  </button>

                  <button className="px-3 py-2 bg-rose-50 text-rose-500 rounded-xl active:scale-95">

                    <Heart size={14} />

                  </button>

                </div>

              </div>

            ))}

          </div>



          <button className="w-full mt-4 bg-white text-orange-600 py-3 rounded-2xl font-medium border-2 border-dashed border-orange-300 active:bg-orange-50">

            🔄 换一批

          </button>

        </div>



        <BottomNav screen={screen} setScreen={setScreen} />

      </div>

    );

  }



  // ============ EAT OUT ============

  if (screen === 'eatout') {

    return (

      <div className="w-full max-w-sm mx-auto bg-gradient-to-b from-amber-50 to-orange-50 min-h-screen pb-24">

        <div className="p-6">

          <button onClick={() => setScreen('home')} className="mb-4 text-amber-700">

            <ArrowLeft size={24} />

          </button>



          <h2 className="text-2xl font-bold text-amber-900 mb-1">出门吃 / 点外卖 🍜</h2>

          <p className="text-amber-700 text-sm mb-5">找点附近的好味道</p>



          <div className="bg-white rounded-2xl p-3 mb-4 shadow-sm flex items-center gap-2">

            <MapPin size={18} className="text-amber-600 flex-shrink-0" />

            <span className="text-sm text-gray-700 flex-1">新加坡 · 乌节路</span>

            <button className="text-xs text-amber-600 font-medium">切换</button>

          </div>



          <div className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-2xl p-4 mb-5">

            <div className="flex items-center gap-2 mb-1">

              <Compass size={18} className="text-amber-700" />

              <span className="text-sm font-bold text-amber-900">旅行模式</span>

            </div>

            <p className="text-xs text-amber-700">第一次来?发现本地不容错过的特色美食 🌍</p>

          </div>



          <div className="flex gap-2 mb-5 overflow-x-auto pb-2">

            {['🍜 全部', '🥟 中餐', '🍱 日料', '🌮 西餐', '🥗 健康'].map(f => (

              <button key={f} className="bg-white px-4 py-2 rounded-full text-sm whitespace-nowrap shadow-sm border border-amber-100 active:bg-amber-100">

                {f}

              </button>

            ))}

          </div>



          <p className="text-sm font-semibold text-gray-700 mb-3">附近热门 📍</p>

          <div className="space-y-3">

            {restaurants.slice(0, 4).map((r, i) => (

              <div key={i} className="bg-white rounded-2xl p-4 shadow-sm">

                <div className="flex gap-3">

                  <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0">

                    {r.emoji}

                  </div>

                  <div className="flex-1">

                    <div className="flex items-start justify-between">

                      <h4 className="font-bold text-gray-900 text-sm">{r.name}</h4>

                      <span className="text-xs bg-teal-50 text-teal-600 px-2 py-0.5 rounded-full flex-shrink-0 ml-1">{r.tag}</span>

                    </div>

                    <p className="text-xs text-gray-500 mt-0.5">{r.cuisine}</p>

                    <div className="flex items-center gap-3 mt-1.5 text-xs">

                      <div className="flex items-center gap-0.5 text-amber-600">

                        <Star size={12} fill="currentColor" />

                        <span className="font-semibold">{r.rating}</span>

                      </div>

                      <div className="flex items-center gap-0.5 text-gray-500">

                        <MapPin size={12} />

                        <span>{r.time}</span>

                      </div>

                    </div>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>



        <BottomNav screen={screen} setScreen={setScreen} />

      </div>

    );

  }



  // ============ RANDOM PICKER (shuffle cards) ============

  if (screen === 'random') {

    const cards = randomMode === 'cook' ? dishSuggestions : restaurants;

    const currentCard = cards[rollingIndex] || cards[0];

    

    return (

      <div className="w-full max-w-sm mx-auto bg-gradient-to-b from-teal-50 to-emerald-50 min-h-screen pb-24">

        <div className="p-6">

          <button onClick={() => setScreen('home')} className="mb-4 text-teal-700">

            <ArrowLeft size={24} />

          </button>



          <h2 className="text-2xl font-bold text-teal-900 mb-1">帮我决定吧! ✨</h2>

          <p className="text-teal-600 text-sm mb-4">点一下,让缘分决定</p>



          {/* Mode toggle */}

          <div className="flex gap-2 bg-white rounded-2xl p-1 mb-4 shadow-sm">

            <button 

              onClick={() => { setRandomMode('cook'); setRandomResult(null); }}

              className={`flex-1 py-2.5 rounded-xl font-medium text-sm transition ${randomMode === 'cook' ? 'bg-teal-500 text-white' : 'text-gray-600'}`}

            >

              <ChefHat size={14} className="inline mr-1" /> 做菜

            </button>

            <button 

              onClick={() => { setRandomMode('eat'); setRandomResult(null); }}

              className={`flex-1 py-2.5 rounded-xl font-medium text-sm transition ${randomMode === 'eat' ? 'bg-teal-500 text-white' : 'text-gray-600'}`}

            >

              <MapPin size={14} className="inline mr-1" /> 外出

            </button>

          </div>



          {/* Restrictions */}

          <button 

            onClick={() => setShowRestrictions(!showRestrictions)}

            className="w-full bg-white rounded-2xl p-3 mb-4 shadow-sm flex items-center justify-between active:bg-teal-50"

          >

            <div className="flex items-center gap-2">

              <span className="text-base">🚫</span>

              <span className="text-sm font-medium text-gray-800">饮食限制</span>

              {restrictions.length > 0 && (

                <span className="text-xs bg-teal-100 text-teal-700 px-2 py-0.5 rounded-full">{restrictions.length} 项</span>

              )}

            </div>

            <span className="text-xs text-gray-500">{restrictions.length === 0 ? '无限制' : '已设置'}</span>

          </button>



          {showRestrictions && (

            <div className="bg-white rounded-2xl p-4 mb-4 shadow-sm">

              <p className="text-xs text-gray-500 mb-3">选择你不想吃的(可多选,也可以不选)</p>

              <div className="flex gap-2 flex-wrap">

                {restrictionOptions.map(opt => (

                  <button 

                    key={opt.id}

                    onClick={() => toggleRestriction(opt.id)}

                    className={`text-xs px-3 py-1.5 rounded-full transition ${restrictions.includes(opt.id) ? 'bg-teal-500 text-white' : 'bg-gray-100 text-gray-600'}`}

                  >

                    {opt.label}

                  </button>

                ))}

              </div>

              <button 

                onClick={() => setRestrictions([])}

                className="text-xs text-teal-600 mt-3 font-medium"

              >

                清空选择

              </button>

            </div>

          )}



          {/* Card stack display */}

          <div className="relative h-80 mb-5">

            {/* Stacked background cards */}

            <div className="absolute inset-x-4 top-3 bottom-3 bg-white rounded-3xl shadow-md opacity-30 scale-90"></div>

            <div className="absolute inset-x-2 top-1.5 bottom-1.5 bg-white rounded-3xl shadow-md opacity-60 scale-95"></div>

            

            {/* Front card */}

            <div className={`absolute inset-0 bg-white rounded-3xl shadow-xl p-6 flex flex-col items-center justify-center text-center ${isRolling ? 'animate-pulse-fast' : ''}`}>

              {!randomResult && !isRolling && (

                <div className="text-gray-400">

                  <div className="text-7xl mb-3 opacity-30">🎴</div>

                  <p className="text-sm">点下方按钮开始</p>

                </div>

              )}

              

              {(isRolling || randomResult) && (

                <div className={`${isRolling ? 'animate-shake' : 'animate-pop-in'}`}>

                  <div className="text-7xl mb-3">{randomResult ? randomResult.emoji : currentCard.emoji}</div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{randomResult ? randomResult.name : currentCard.name}</h3>

                  {(randomResult?.why || (!randomResult && currentCard.why)) && (

                    <p className="text-sm text-teal-600 italic mb-2 px-4">"{randomResult ? randomResult.why : currentCard.why}"</p>

                  )}

                  {(randomResult?.cuisine || (!randomResult && currentCard.cuisine)) && (

                    <>

                      <p className="text-sm text-gray-500">{randomResult ? randomResult.cuisine : currentCard.cuisine}</p>

                      <div className="flex items-center justify-center gap-1 mt-1 text-amber-500">

                        <Star size={14} fill="currentColor" />

                        <span className="text-sm font-semibold">{randomResult ? randomResult.rating : currentCard.rating}</span>

                        <span className="text-gray-400 mx-1">·</span>

                        <span className="text-xs text-gray-500">{randomResult ? randomResult.time : currentCard.time}</span>

                      </div>

                    </>

                  )}

                  {randomResult?.tags && (

                    <div className="flex gap-1 mt-3 flex-wrap justify-center">

                      {randomResult.tags.map(t => (

                        <span key={t} className="text-xs bg-teal-50 text-teal-700 px-2 py-0.5 rounded-full">{t}</span>

                      ))}

                    </div>

                  )}

                </div>

              )}

              

              {randomResult && !isRolling && (

                <div className="absolute top-4 right-4 bg-gradient-to-br from-teal-400 to-emerald-500 text-white text-xs px-3 py-1 rounded-full font-bold shadow">

                  ✨ 缘分

                </div>

              )}

            </div>

          </div>



          {/* Action button */}

          {!randomResult ? (

            <button 

              onClick={rollRandom}

              disabled={isRolling}

              className="w-full bg-gradient-to-br from-teal-400 to-emerald-500 text-white py-4 rounded-2xl font-bold shadow-lg shadow-teal-200 active:scale-95 disabled:opacity-70 flex items-center justify-center gap-2 text-lg"

            >

              {isRolling ? (

                <>

                  <RotateCw size={20} className="animate-spin" /> 正在挑选...

                </>

              ) : (

                <>

                  <Sparkles size={20} /> 帮我决定!

                </>

              )}

            </button>

          ) : (

            <div className="flex gap-2">

              <button 

                onClick={rollRandom}

                className="flex-1 bg-white text-teal-600 py-3.5 rounded-2xl font-medium border-2 border-teal-200 active:bg-teal-50 flex items-center justify-center gap-2"

              >

                <Shuffle size={16} /> 再来一次

              </button>

              <button 

                className="flex-1 bg-gradient-to-br from-teal-400 to-emerald-500 text-white py-3.5 rounded-2xl font-bold shadow-md active:scale-95"

              >

                ✓ 就它了!

              </button>

            </div>

          )}



          <div className="bg-teal-100 rounded-2xl p-3 mt-4 text-center">

            <p className="text-xs text-teal-700">💡 接受第一次的结果,选择困难就好啦!</p>

          </div>

        </div>



        <BottomNav screen={screen} setScreen={setScreen} />

      </div>

    );

  }



  // ============ COMMUNITY ============

  if (screen === 'community') {

    return (

      <div className="w-full max-w-sm mx-auto bg-gradient-to-b from-amber-50 to-orange-50 min-h-screen pb-24">

        <div className="p-6">

          <h2 className="text-2xl font-bold text-orange-900 mb-1">美食社区 👥</h2>

          <p className="text-orange-600 text-sm mb-5">温暖的美食分享角</p>



          <div className="flex gap-2 bg-white rounded-2xl p-1 mb-5 shadow-sm">

            <button 

              onClick={() => setCommunityTab('discover')}

              className={`flex-1 py-2.5 rounded-xl font-medium text-sm transition ${communityTab === 'discover' ? 'bg-orange-500 text-white' : 'text-gray-600'}`}

            >

              <Compass size={14} className="inline mr-1" /> 发现

            </button>

            <button 

              onClick={() => setCommunityTab('ask')}

              className={`flex-1 py-2.5 rounded-xl font-medium text-sm transition ${communityTab === 'ask' ? 'bg-orange-500 text-white' : 'text-gray-600'}`}

            >

              <HelpCircle size={14} className="inline mr-1" /> 求助

            </button>

          </div>



          {communityTab === 'discover' && (

            <div className="space-y-3">

              {communityPosts.map((post, i) => (

                <div key={i} className="bg-white rounded-2xl p-4 shadow-sm">

                  <div className="flex items-center gap-2 mb-3">

                    <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">

                      <QQAvatar config={post.avatarConfig} size="xs" />

                    </div>

                    <div className="flex-1">

                      <p className="text-sm font-semibold text-gray-900">{post.user}</p>

                      <p className="text-xs text-gray-400">{post.time}</p>

                    </div>

                  </div>

                  <p className="text-sm text-gray-800 mb-3">{post.dish}</p>

                  <div className="bg-orange-50 rounded-2xl py-8 flex items-center justify-center text-5xl mb-3">

                    {post.emoji}

                  </div>

                  <div className="flex gap-3 text-sm">

                    <button className="flex items-center gap-1 text-orange-600 active:scale-90">

                      😋 <span className="text-xs">{post.reactions.yum}</span>

                    </button>

                    <button className="flex items-center gap-1 text-rose-500 active:scale-90">

                      💛 <span className="text-xs">{post.reactions.save}</span>

                    </button>

                    <button className="flex items-center gap-1 text-amber-600 active:scale-90">

                      🤔 <span className="text-xs">{post.reactions.curious}</span>

                    </button>

                  </div>

                </div>

              ))}

            </div>

          )}



          {communityTab === 'ask' && (

            <div className="space-y-3">

              {askPosts.map((post, i) => (

                <div key={i} className="bg-white rounded-2xl p-4 shadow-sm">

                  <div className="flex items-center gap-2 mb-3">

                    <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">

                      <QQAvatar config={post.avatarConfig} size="xs" />

                    </div>

                    <div className="flex-1">

                      <p className="text-sm font-semibold text-gray-900">{post.user}</p>

                      <p className="text-xs text-gray-400">{post.time}</p>

                    </div>

                  </div>

                  <p className="text-sm text-gray-800 mb-3 font-medium">{post.question}</p>

                  <div className="flex items-center justify-between pt-2 border-t border-orange-50">

                    <div className="flex items-center gap-1 text-xs text-orange-600">

                      <MessageCircle size={14} /> {post.replies} 条回复

                    </div>

                    <button className="text-xs text-orange-600 font-medium">去回答 →</button>

                  </div>

                </div>

              ))}

              

              <button className="w-full bg-orange-500 text-white py-3.5 rounded-2xl font-semibold shadow-md active:scale-95 flex items-center justify-center gap-2 mt-2">

                <Plus size={18} /> 我也来问一个

              </button>

            </div>

          )}



          <div className="mt-6 bg-gradient-to-r from-teal-100 to-emerald-100 rounded-2xl p-4">

            <div className="flex items-center gap-2 mb-1">

              <Heart size={16} className="text-teal-600" />

              <p className="text-sm font-bold text-teal-900">即将上线:家庭圈</p>

            </div>

            <p className="text-xs text-teal-700">和家人分享每日餐桌,把爱传递 💛</p>

          </div>

        </div>



        <BottomNav screen={screen} setScreen={setScreen} />

      </div>

    );

  }



  // ============ PROFILE ============

  if (screen === 'profile') {

    const avatarConfig = selectedAvatar || { gender: 'female', hair: 0, outfit: 0, accessory: 0, bg: 0 };

    return (

      <div className="w-full max-w-sm mx-auto bg-gradient-to-b from-orange-50 to-amber-50 min-h-screen pb-24">

        <div className="p-6">

          <button onClick={() => setScreen('home')} className="mb-4 text-orange-700">

            <ArrowLeft size={24} />

          </button>



          <div className="text-center mb-6">

            <div className="w-28 h-28 rounded-full mx-auto mb-3 shadow-md overflow-hidden">

              <QQAvatar config={avatarConfig} size="lg" />

            </div>

            <h3 className="text-xl font-bold text-orange-900">我的小厨房</h3>

            <p className="text-sm text-orange-600">今天起的美食伙伴 💛</p>

            <button 

              onClick={() => { setCustomGender(avatarConfig.gender); setCustomHair(avatarConfig.hair); setCustomOutfit(avatarConfig.outfit); setCustomAccessory(avatarConfig.accessory); setCustomBg(avatarConfig.bg); setScreen('avatarCreate'); setAvatarStep('custom'); }}

              className="mt-3 text-xs bg-orange-100 text-orange-700 px-4 py-1.5 rounded-full font-medium"

            >

              ✨ 自定义形象

            </button>

          </div>



          <div className="grid grid-cols-3 gap-2 mb-5">

            <div className="bg-white rounded-2xl p-3 text-center shadow-sm">

              <div className="text-xl font-bold text-orange-600">12</div>

              <div className="text-xs text-gray-500">道菜</div>

            </div>

            <div className="bg-white rounded-2xl p-3 text-center shadow-sm">

              <div className="text-xl font-bold text-amber-600">5</div>

              <div className="text-xs text-gray-500">家餐厅</div>

            </div>

            <div className="bg-white rounded-2xl p-3 text-center shadow-sm">

              <div className="text-xl font-bold text-teal-600">8</div>

              <div className="text-xs text-gray-500">已收藏</div>

            </div>

          </div>



          <div className="space-y-2">

            <ProfileRow icon="🥗" label="饮食偏好" />

            <ProfileRow icon="❤️" label="健康状况" />

            <ProfileRow icon="🌶️" label="喜爱菜系" />

            <ProfileRow icon="📖" label="我的菜谱" />

            <ProfileRow icon="👨‍👩‍👧" label="家庭成员" />

            <ProfileRow icon="⚙️" label="设置" />

          </div>

        </div>



        <BottomNav screen={screen} setScreen={setScreen} />

      </div>

    );

  }



  return null;

}



// ============ QQ秀-style Avatar (SVG-based, layered) ============

function QQAvatar({ config, size = 'md', hideBg = false }) {

  const sizeMap = {

    xs: 48,

    sm: 80,

    md: 140,

    lg: 180,

    xl: 240,

  };

  const px = sizeMap[size];



  const isFemale = config.gender === 'female';

  const hairColors = {

    female: ['#3d2818', '#5c3920', '#4a2c1a', '#6b4423'],

    male: ['#2a1810', '#3d2818', '#1a0f08', '#4a2c1a'],

  };

  const outfitColors = ['#fb923c', '#5eead4', '#fcd34d', '#fda4af'];

  const bgGradients = [

    ['#fed7aa', '#fcd34d'],

    ['#99f6e4', '#86efac'],

    ['#fecaca', '#fbcfe8'],

    ['#bae6fd', '#bfdbfe'],

  ];

  

  const hairColor = hairColors[config.gender][config.hair];

  const outfitColor = outfitColors[config.outfit];

  const [bgStart, bgEnd] = bgGradients[config.bg];

  

  const accessoryEmojis = ['', '🎩', '👓', '🌸'];



  return (

    <svg viewBox="0 0 200 200" width={px} height={px} xmlns="http://www.w3.org/2000/svg">

      <defs>

        <radialGradient id={`bg-${config.gender}-${config.bg}-${size}`} cx="50%" cy="40%">

          <stop offset="0%" stopColor={bgStart} />

          <stop offset="100%" stopColor={bgEnd} />

        </radialGradient>

        <radialGradient id={`face-${size}`} cx="40%" cy="40%">

          <stop offset="0%" stopColor="#fef3c7" />

          <stop offset="100%" stopColor="#fde68a" />

        </radialGradient>

        <linearGradient id={`outfit-${config.outfit}-${size}`} x1="0%" y1="0%" x2="0%" y2="100%">

          <stop offset="0%" stopColor={outfitColor} stopOpacity="1" />

          <stop offset="100%" stopColor={outfitColor} stopOpacity="0.7" />

        </linearGradient>

      </defs>

      

      {/* Background circle */}

      {!hideBg && (

        <circle cx="100" cy="100" r="100" fill={`url(#bg-${config.gender}-${config.bg}-${size})`} />

      )}

      

      {/* Neck */}

      <rect x="85" y="125" width="30" height="20" fill="#fde68a" rx="4" />

      

      {/* Body / Outfit */}

      <path d="M 50 200 Q 50 145 100 140 Q 150 145 150 200 Z" fill={`url(#outfit-${config.outfit}-${size})`} />

      {config.outfit === 0 && (

        // Apron strings

        <>

          <rect x="95" y="140" width="10" height="40" fill="#ffffff" opacity="0.5" />

          <circle cx="100" cy="155" r="3" fill="#ffffff" opacity="0.8" />

        </>

      )}

      

      {/* Head */}

      <circle cx="100" cy="95" r="38" fill={`url(#face-${size})`} />

      

      {/* Ears */}

      <ellipse cx="65" cy="98" rx="5" ry="8" fill="#fde68a" />

      <ellipse cx="135" cy="98" rx="5" ry="8" fill="#fde68a" />

      

      {/* Hair - varies by gender and style */}

      {isFemale && config.hair === 0 && (

        // Short bob

        <>

          <path d="M 62 90 Q 60 60 100 55 Q 140 60 138 90 Q 138 70 100 65 Q 70 68 62 90 Z" fill={hairColor} />

          <path d="M 62 90 L 62 105 Q 70 100 75 90 Z" fill={hairColor} />

          <path d="M 138 90 L 138 105 Q 130 100 125 90 Z" fill={hairColor} />

        </>

      )}

      {isFemale && config.hair === 1 && (

        // Long hair

        <>

          <path d="M 60 90 Q 55 55 100 52 Q 145 55 140 90 L 140 165 Q 140 170 130 168 L 130 100 Q 120 92 100 90 Q 80 92 70 100 L 70 168 Q 60 170 60 165 Z" fill={hairColor} />

          <path d="M 62 70 Q 80 58 100 60" fill="none" stroke={hairColor} strokeWidth="3" />

        </>

      )}

      {isFemale && config.hair === 2 && (

        // Bun

        <>

          <ellipse cx="100" cy="55" rx="22" ry="18" fill={hairColor} />

          <path d="M 65 90 Q 60 65 100 62 Q 140 65 135 90 Q 135 78 100 75 Q 70 78 65 90 Z" fill={hairColor} />

          <ellipse cx="100" cy="50" rx="15" ry="12" fill={hairColor} opacity="0.7" />

        </>

      )}

      {isFemale && config.hair === 3 && (

        // Curly

        <>

          <path d="M 58 95 Q 55 58 100 53 Q 145 58 142 95 L 142 130 Q 138 135 130 130 L 130 100 Q 115 95 100 95 Q 85 95 70 100 L 70 130 Q 62 135 58 130 Z" fill={hairColor} />

          <circle cx="65" cy="80" r="6" fill={hairColor} />

          <circle cx="135" cy="80" r="6" fill={hairColor} />

          <circle cx="70" cy="120" r="8" fill={hairColor} />

          <circle cx="130" cy="120" r="8" fill={hairColor} />

        </>

      )}

      

      {!isFemale && config.hair === 0 && (

        // Short male

        <path d="M 65 88 Q 62 62 100 58 Q 138 62 135 88 Q 130 72 100 70 Q 75 72 65 88 Z" fill={hairColor} />

      )}

      {!isFemale && config.hair === 1 && (

        // Medium male

        <>

          <path d="M 62 95 Q 58 58 100 55 Q 142 58 138 95 L 138 110 Q 138 100 100 95 Q 70 95 62 110 Z" fill={hairColor} />

        </>

      )}

      {!isFemale && config.hair === 2 && (

        // Spiky

        <>

          <path d="M 65 88 Q 62 60 100 58 Q 138 60 135 88 Q 130 70 100 68 Q 75 70 65 88 Z" fill={hairColor} />

          <path d="M 80 62 L 75 50 L 88 60 Z" fill={hairColor} />

          <path d="M 100 58 L 98 45 L 105 58 Z" fill={hairColor} />

          <path d="M 118 60 L 125 50 L 120 65 Z" fill={hairColor} />

        </>

      )}

      {!isFemale && config.hair === 3 && (

        // Side parted

        <>

          <path d="M 64 90 Q 60 60 100 56 Q 140 60 136 90 Q 132 72 105 70 Q 75 75 64 90 Z" fill={hairColor} />

          <path d="M 80 65 Q 100 60 130 72" fill="none" stroke={hairColor} strokeWidth="4" strokeLinecap="round" />

        </>

      )}

      

      {/* Eyes */}

      <ellipse cx="85" cy="98" rx="4" ry="5" fill="#1f2937" />

      <ellipse cx="115" cy="98" rx="4" ry="5" fill="#1f2937" />

      <circle cx="86" cy="96" r="1.5" fill="#ffffff" />

      <circle cx="116" cy="96" r="1.5" fill="#ffffff" />

      

      {/* Blush */}

      <ellipse cx="75" cy="110" rx="6" ry="3" fill="#fb7185" opacity="0.5" />

      <ellipse cx="125" cy="110" rx="6" ry="3" fill="#fb7185" opacity="0.5" />

      

      {/* Mouth */}

      <path d="M 92 115 Q 100 121 108 115" fill="none" stroke="#1f2937" strokeWidth="2" strokeLinecap="round" />

      

      {/* Accessory */}

      {config.accessory === 1 && (

        // Chef hat

        <g>

          <ellipse cx="100" cy="48" rx="32" ry="8" fill="#ffffff" />

          <path d="M 70 48 Q 65 25 85 22 Q 90 12 100 14 Q 110 12 115 22 Q 135 25 130 48 Z" fill="#ffffff" />

          <ellipse cx="100" cy="50" rx="32" ry="4" fill="#f3f4f6" />

        </g>

      )}

      {config.accessory === 2 && (

        // Glasses

        <g>

          <circle cx="85" cy="98" r="9" fill="none" stroke="#1f2937" strokeWidth="2" />

          <circle cx="115" cy="98" r="9" fill="none" stroke="#1f2937" strokeWidth="2" />

          <line x1="94" y1="98" x2="106" y2="98" stroke="#1f2937" strokeWidth="2" />

        </g>

      )}

      {config.accessory === 3 && (

        // Flower

        <g transform="translate(125, 72)">

          <circle cx="0" cy="0" r="3" fill="#fbbf24" />

          <circle cx="-5" cy="-3" r="4" fill="#fb7185" />

          <circle cx="5" cy="-3" r="4" fill="#fb7185" />

          <circle cx="-5" cy="3" r="4" fill="#fb7185" />

          <circle cx="5" cy="3" r="4" fill="#fb7185" />

          <circle cx="0" cy="-6" r="4" fill="#fb7185" />

        </g>

      )}

    </svg>

  );

}



// ============ QQ秀 Customization Screen ============

function QQXiuCustomization({ config, customGender, setCustomGender, customHair, setCustomHair, customOutfit, setCustomOutfit, customAccessory, setCustomAccessory, customBg, setCustomBg, hairOptions, outfitOptions, accessoryOptions, bgOptions, onBack, onDone }) {

  const [activeTab, setActiveTab] = useState('hair');



  const tabs = [

    { id: 'hair', label: '发型', icon: '💇' },

    { id: 'outfit', label: '服装', icon: '👕' },

    { id: 'accessory', label: '装饰', icon: '✨' },

    { id: 'bg', label: '背景', icon: '🎨' },

  ];



  return (

    <div className="w-full max-w-sm mx-auto bg-gradient-to-b from-orange-50 to-amber-50 min-h-screen flex flex-col">

      <div className="p-6 pb-3">

        <button onClick={onBack} className="mb-3 text-orange-700">

          <ArrowLeft size={24} />

        </button>

        <h2 className="text-xl font-bold text-orange-900 mb-1">DIY 你的形象</h2>

        <p className="text-orange-600 text-xs">自由搭配,做独一无二的你</p>

      </div>



      {/* Avatar preview */}

      <div className="flex justify-center mb-3">

        <div className="w-56 h-56 rounded-full shadow-xl overflow-hidden">

          <QQAvatar config={config} size="xl" />

        </div>

      </div>



      {/* Gender toggle - using symbols */}

      <div className="flex justify-center gap-2 mb-4 px-6">

        <button 

          onClick={() => setCustomGender('male')}

          className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-bold shadow-sm transition ${customGender === 'male' ? 'bg-blue-500 text-white shadow-blue-200' : 'bg-white text-gray-400'}`}

        >

          ♂

        </button>

        <button 

          onClick={() => setCustomGender('female')}

          className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-bold shadow-sm transition ${customGender === 'female' ? 'bg-pink-500 text-white shadow-pink-200' : 'bg-white text-gray-400'}`}

        >

          ♀

        </button>

      </div>



      {/* Customization panel */}

      <div className="flex-1 bg-white rounded-t-3xl shadow-2xl p-5 pb-6">

        {/* Tab bar */}

        <div className="flex gap-1 mb-4 bg-orange-50 rounded-2xl p-1">

          {tabs.map(tab => (

            <button 

              key={tab.id}

              onClick={() => setActiveTab(tab.id)}

              className={`flex-1 py-2 rounded-xl text-xs font-medium transition ${activeTab === tab.id ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-500'}`}

            >

              <div className="text-base mb-0.5">{tab.icon}</div>

              {tab.label}

            </button>

          ))}

        </div>



        {/* Tab content */}

        <div className="grid grid-cols-4 gap-2 mb-5 min-h-24">

          {activeTab === 'hair' && hairOptions[customGender].map((opt, i) => (

            <button 

              key={opt.id}

              onClick={() => setCustomHair(i)}

              className={`aspect-square rounded-2xl flex flex-col items-center justify-center text-xs transition relative ${customHair === i ? 'bg-orange-100 ring-2 ring-orange-400' : 'bg-gray-50 hover:bg-gray-100'}`}

            >

              <div className="w-8 h-8 rounded-full" style={{ background: opt.color }}></div>

              <span className="mt-1 text-xs text-gray-700">{opt.name}</span>

              {customHair === i && (

                <div className="absolute top-1 right-1 bg-orange-500 rounded-full p-0.5">

                  <Check size={10} className="text-white" />

                </div>

              )}

            </button>

          ))}

          

          {activeTab === 'outfit' && outfitOptions.map((opt, i) => (

            <button 

              key={opt.id}

              onClick={() => setCustomOutfit(i)}

              className={`aspect-square rounded-2xl flex flex-col items-center justify-center transition relative ${customOutfit === i ? 'bg-orange-100 ring-2 ring-orange-400' : 'bg-gray-50 hover:bg-gray-100'}`}

            >

              <div className="text-2xl">{opt.emoji}</div>

              <span className="text-xs text-gray-700 mt-0.5">{opt.name}</span>

              {customOutfit === i && (

                <div className="absolute top-1 right-1 bg-orange-500 rounded-full p-0.5">

                  <Check size={10} className="text-white" />

                </div>

              )}

            </button>

          ))}



          {activeTab === 'accessory' && accessoryOptions.map((opt, i) => (

            <button 

              key={opt.id}

              onClick={() => setCustomAccessory(i)}

              className={`aspect-square rounded-2xl flex flex-col items-center justify-center transition relative ${customAccessory === i ? 'bg-orange-100 ring-2 ring-orange-400' : 'bg-gray-50 hover:bg-gray-100'}`}

            >

              <div className="text-2xl">{opt.emoji || '—'}</div>

              <span className="text-xs text-gray-700 mt-0.5">{opt.name}</span>

              {customAccessory === i && (

                <div className="absolute top-1 right-1 bg-orange-500 rounded-full p-0.5">

                  <Check size={10} className="text-white" />

                </div>

              )}

            </button>

          ))}



          {activeTab === 'bg' && bgOptions.map((opt, i) => (

            <button 

              key={opt.id}

              onClick={() => setCustomBg(i)}

              className={`aspect-square rounded-2xl flex items-center justify-center transition relative bg-gradient-to-br ${opt.color} ${customBg === i ? 'ring-2 ring-orange-400 scale-105' : ''}`}

            >

              {customBg === i && (

                <div className="absolute top-1 right-1 bg-orange-500 rounded-full p-0.5">

                  <Check size={10} className="text-white" />

                </div>

              )}

            </button>

          ))}

        </div>



        <button 

          onClick={onDone}

          className="w-full bg-orange-500 text-white py-4 rounded-2xl font-semibold shadow-lg shadow-orange-200 active:scale-95"

        >

          就这样了! 💛

        </button>

      </div>

    </div>

  );

}



function AvatarGenerating({ onDone }) {

  const [progress, setProgress] = useState(0);

  const messages = ['正在分析你的特征...', '挑选最适合的色彩...', '加上一点小巧思...', '马上就好啦!'];

  const [msgIdx, setMsgIdx] = useState(0);



  useEffect(() => {

    const interval = setInterval(() => {

      setProgress(p => {

        if (p >= 100) {

          clearInterval(interval);

          setTimeout(onDone, 300);

          return 100;

        }

        return p + 3;

      });

    }, 80);

    return () => clearInterval(interval);

  }, [onDone]);



  useEffect(() => {

    setMsgIdx(Math.min(Math.floor(progress / 25), messages.length - 1));

  }, [progress]);



  return (

    <div className="text-center pt-16">

      <div className="text-7xl mb-6 animate-pulse">✨</div>

      <h2 className="text-xl font-bold text-orange-900 mb-2">正在生成你的专属形象...</h2>

      <p className="text-orange-700 text-sm mb-8 h-5">{messages[msgIdx]}</p>

      

      <div className="bg-white rounded-full h-3 overflow-hidden shadow-inner mx-4">

        <div 

          className="h-full bg-gradient-to-r from-orange-400 to-amber-400 transition-all duration-100"

          style={{ width: `${progress}%` }}

        ></div>

      </div>

      <p className="text-xs text-orange-500 mt-2">{progress}%</p>

    </div>

  );

}



function ProfileRow({ icon, label }) {

  return (

    <button className="w-full bg-white rounded-2xl p-4 shadow-sm flex items-center gap-3 active:bg-orange-50">

      <div className="text-2xl">{icon}</div>

      <span className="text-sm font-medium text-gray-800 flex-1 text-left">{label}</span>

      <span className="text-orange-400">›</span>

    </button>

  );

}



function BottomNav({ screen, setScreen }) {

  const items = [

    { id: 'home', icon: Home, label: '首页' },

    { id: 'cook', icon: ChefHat, label: '做饭' },

    { id: 'eatout', icon: UtensilsCrossed, label: '外出' },

    { id: 'community', icon: Users, label: '社区' },

    { id: 'profile', icon: User, label: '我的' },

  ];



  return (

    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-sm bg-white border-t border-orange-100 shadow-lg">

      <div className="flex justify-around py-2">

        {items.map(item => {

          const Icon = item.icon;

          const active = screen === item.id;

          return (

            <button

              key={item.id}

              onClick={() => setScreen(item.id)}

              className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition ${active ? 'text-orange-600' : 'text-gray-400'}`}

            >

              <Icon size={20} />

              <span className="text-xs font-medium">{item.label}</span>

            </button>

          );

        })}

      </div>

    </div>

  );

}