(require 'ox-publish)

(setq org-publish-project-alist
      '(
	("posts"
	 :base-directory "~/jd-m.github.io/tlac-site/posts/"
	 :base-extension "org"
	 :publishing-directory "~/jd-m.github.io/tlac-site/posts/"
	 :recursive nil
	 :publishing-function tlac-html-publish-to-html
	 :headline-levels 4
	 :with-toc nil
	 :section-numbers nil
	 )
	
	("index"
	 :base-directory "~/jd-m.github.io/tlac-site"
	 :base-extension "org"
	 :publishing-directory "~/jd-m.github.io/tlac-site/"
	 :recursive nil
	 :publishing-function tlac-html-publish-to-html
	 :headline-levels 4
	 :with-toc nil
	 :section-numbers nil
	 )

	("tlac-site" :components ("posts" "index"))
	))
