c o n s t   e x p r e s s   =   r e q u i r e ( " e x p r e s s " ) ; 
 c o n s t   c o o k i e P a r s e r   =   r e q u i r e ( " c o o k i e - p a r s e r " ) ; 
 
 c o n s t   a p p   =   e x p r e s s ( ) ; 
 
 / / P a g e s   - - - - - - - - - - - - - - - - - - - - - - - 
 c o n s t   L o g i n   =   r e q u i r e ( ' . / . / . / P a g e s / L o g i n ' ) ;   / / f i x   s o   c a l l   i s   c o r r e c t 
 c o n s t   C r e a t e A c c o u n t   =   r e q u i r e ( ' . / . / . / P a g e s / C r e a t e A c c o u n t ' ) ; 
 c o n s t   U s e r M e n u   =   r e q u i r e ( ' . / . / . / P a g e s / U s e r M e n u ' ) ; 
 
 a p p . u s e ( L o g i n ) ; 
 a p p . u s e ( C r e a t e A c c o u n t ) ; 
 a p p . u s e ( U s e r M e n u ) ; 
 / / P a g e s   - - - - - - - - - - - - - - - - - - - - - - - 
 
 c o n s o l e . l o g ( " T h i s   i s   r u n " ) ; 
 
 a p p . u s e ( c o o k i e P a r s e r ( ) ) ; 
 
 a p p . u s e ( " / P u b l i c " ,   e x p r e s s . s t a t i c ( ' P u b l i c ' ) ) ;   / /   M a k e   p u b l i c   f o l d e r   p u b l i c 
 
 a p p . g e t ( " / " ,   ( r e q ,   r e s )   = >   {   / /   R e d i r e c t   t o   l o g i n 
     r e s . r e d i r e c t ( ' / L o g i n ' ) 
     c o n s o l e . l o g ( " r e q u e s t e d   l o g i n " ) ; 
 } ) ; 
 
 / / a p p . g e t ( " * " ,   ( r e q , r e s )   = >   {   / /   R e d i r e c t   t o   P a g e n o t F o u n d   i f   r e q u e s t   i n v a l i d   p a g e 
 / / r e s . s e n d F i l e ( _ _ d i r n a m e   +   ' / P u b l i c / P a g e _ N o t _ F o u n d / P a g e _ N o t _ F o u n d . h t m l ' ) 
 / / } ) ; 
 
 a p p . l i s t e n ( 3 0 0 0 ) ;   / /   W h i c h   p o r t   s e r v e r   l i s t e n s   t o 
 
 m o d u l e . e x p o r t s   =   a p p ; 
 